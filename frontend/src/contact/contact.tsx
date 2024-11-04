import { lookup } from "../lookup";
import { paths_dict } from "../lookup/url";
import { useTranslation } from "react-i18next";
import { getLocalizedDate } from "../lookup/localize";

export interface ContactInterface {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  is_read: boolean;
  created_at: Date;
}

interface ContactComponentInterface {
  contact: ContactInterface;
  contacts: ContactInterface[];
  setContacts: (updatedContact: ContactInterface[]) => void;
}

export function ContactComponent(props: ContactComponentInterface) {
  const { contact, setContacts, contacts } = props;
  const { t } = useTranslation();

  const handleReadOrUnreadClick = (
    event: React.MouseEvent<HTMLAnchorElement>
  ) => {
    event.preventDefault();
    const endpoint = `${paths_dict.contact}${contact.id}/`;
    const data = {
      is_read: !contact.is_read,
      name: contact.name,
      email: contact.email,
      subject: contact.subject,
      message: contact.message,
    };
    lookup(
      "PUT",
      endpoint,
      (response, status) => {
        if (status === 200) {
          const updatedContacts = contacts.map((c) =>
            c.id === response.id ? response : c
          );
          setContacts(updatedContacts);
        }
      },
      data,
      { "Content-Type": "multipart/form-data" }
    );
  };
  return (
    <div
      className={`card ${
        contact.is_read ? "border-primary" : "border-warning"
      }`}
    >
      <div
        className={`card-header p-3 ${
          contact.is_read ? "border-primary" : "border-warning"
        }`}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h6 className="card-title">
          <small
            className={`text-muted m-1${
              contact.is_read ? "" : " font-weight-bold"
            }`}
          >
            {getLocalizedDate(contact.created_at)}
          </small>
          <a
            href={`mailto: ${contact.email}`}
            style={{ cursor: "pointer" }}
            title={contact.email}
            className={`${contact.is_read ? "text-primary" : "text-warning"}`}
          >
            @{contact.name}
          </a>
        </h6>
        <a
          href=""
          className={`btn btn-sm ${
            contact.is_read ? "btn-outline-primary" : "btn-outline-warning"
          }`}
          title={t("Mark As read or unread")}
          onClick={handleReadOrUnreadClick}
        >
          {t("Mark As")} {contact.is_read ? t("Unread") : t("Read")}
        </a>
      </div>

      <div className="card-body p-2">
        <h6 className="text-muted text-center">{contact.subject}</h6>
        <p>{contact.message}</p>
      </div>
    </div>
  );
}
