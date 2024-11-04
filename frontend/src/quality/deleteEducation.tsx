import { ButtonComponent } from "../components";
import { lookup } from "../lookup";
import { paths_dict } from "../lookup/url";
import { EducationInterface } from "./education";
import { useTranslation } from "react-i18next";

interface DeleteEducationInterface {
  education: EducationInterface;
  educations: EducationInterface[];
  setEducations: (data: any) => void;
  messageToShowUser: (message: string, alert_type: string) => void;
}

export function DeleteEducation(props: DeleteEducationInterface) {
  const { education, setEducations, messageToShowUser, educations } = props;
  const { t } = useTranslation();
  const handleLookupCallback = (response: any, status: number) => {
    if (status === 204) {
      // TODO:check
      console.log(response);
      const updatedEducations = educations.filter(
        (edu) => edu.id !== education.id
      );
      setEducations(updatedEducations);
      messageToShowUser(
        t("objectRemoved", { title: education.title }),
        "alert alert-success"
      );
    }
  };
  const handleOnClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    const confirmation = window.confirm(
      t("removeConfirm", { title: education.title })
    );
    if (confirmation) {
      const endpoint = `${paths_dict.education}${education.id}/`;
      lookup(
        "DELETE",
        endpoint,
        handleLookupCallback,
        {},
        { "Content-Type": "application/json" }
      ).catch((error) => {
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
