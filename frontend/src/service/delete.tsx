import { ButtonComponent } from "../components";
import { lookup } from "../lookup";
import { ServiceInterface } from "./service";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { paths_dict } from "../lookup/url";

interface DeleteServiceInterface {
  service: ServiceInterface;
  messageToShowUser: (message: string, alert_type: string) => void;
}
export function DeleteService(props: DeleteServiceInterface) {
  const { service, messageToShowUser } = props;
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleLookupCallback = (response: any, status: number) => {
    if (status === 204) {
      // TODO:check
      console.log(response);
      messageToShowUser(
        t("objectRemoved", { title: service.title }),
        "alert alert-success"
      );
    }
  };
  const handleOnClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    const confirmation = window.confirm(
      t("removeConfirm", { title: service.title })
    );
    if (confirmation) {
      const endpoint = `${paths_dict.service}${service.id}/`;
      lookup(
        "DELETE",
        endpoint,
        handleLookupCallback,
        {},
        { "Content-Type": "application/json" }
      )
        .then(() => {
          navigate("/");
        })
        .catch((error) => {
          messageToShowUser(
            t(
              `Sorry it seems that server is not responding. Please try again later!\n${error}`
            ),
            "alert alert-danger"
          );
        });
    }
  };

  return (
    <ButtonComponent
      class_name="m-3 btn btn-sm btn-outline-secondary"
      text={<i className="fas fa-trash-alt"></i>}
      type="button"
      onclick={handleOnClick}
    />
  );
}
