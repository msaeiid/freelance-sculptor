import { ButtonComponent } from "../components";
import { lookup } from "../lookup";
import { paths_dict } from "../lookup/url";
import { SkillInterface } from "./skill";
import { useTranslation } from "react-i18next";

interface DeleteSkillInterface {
  skill: SkillInterface;
  skills: SkillInterface[];
  setSkills: (data: any) => void;
  messageToShowUser: (message: string, alert_type: string) => void;
}
export function DeleteSkill(props: DeleteSkillInterface) {
  const { skill, skills, setSkills, messageToShowUser } = props;
  const { t } = useTranslation();

  const handleLookupCallback = (response: any, status: number) => {
    if (status === 204) {
      const updatedSkills = skills.filter((ski) => ski.id !== skill.id);
      setSkills(updatedSkills);
      // TODO:check
      console.log(response);
      messageToShowUser(
        t("objectRemoved", { title: skill.title }),
        "alert alert-success"
      );
    }
  };
  const handleOnClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    const confirmation = window.confirm(
      t("removeConfirm", { title: skill.title })
    );
    if (confirmation) {
      const endpoint = `${paths_dict.skill}${skill.id}/`;
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
