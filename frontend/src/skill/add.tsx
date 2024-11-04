import { Dispatch, SetStateAction, useState } from "react";
import { SkillInterface } from "./skill";
import { lookup } from "../lookup/components";
import { ModalComponent } from "../components";
import { SkillFormMaker } from "./form";
import { useTranslation } from "react-i18next";
import { paths_dict } from "../lookup/url";

interface AddSkillComponentInterface {
  setSkills: Dispatch<SetStateAction<SkillInterface[]>>;
  messageToShowUser: (message: string, alert_type: string) => void;
  skills: SkillInterface[];
}
export function AddSkillComponent(props: AddSkillComponentInterface) {
  const { setSkills, messageToShowUser, skills } = props;
  const { t } = useTranslation();

  const CloseModal = () => {
    const modalCloseButton = document.getElementById("closeModal");
    modalCloseButton?.click();
  };
  const handleOnSkillAddFormSubmit = (data: any) => {
    const endpoint = `${paths_dict.skill}`;
    lookup(
      "POST",
      endpoint,
      (response, status) => {
        if (status === 201) {
          CloseModal();
          setSkills([...skills, response]);
          messageToShowUser(
            t("objectAdded", { title: response.title }),
            "alert alert-success"
          );
        }
      },
      data,
      { "Content-Type": "application/json" }
    ).catch((error) => {
      messageToShowUser(
        t(
          `Sorry it seems that server is not responding. Please try again later!\n${error}`
        ),
        "alert alert-danger"
      );
    });
  };

  const default_data = {
    id: 0,
    title: "",
    percentage: 0,
    color: "",
    scrolledOn: false,
  };
  const [formIsValid, setFormIsValid] = useState(true);
  return (
    <ModalComponent
      buttonClassName={"btn btn-outline-secondary m-3"}
      buttonFontAwesome={"fas fa-plus"}
      children={
        <SkillFormMaker
          skill={default_data}
          setFormIsValid={setFormIsValid}
          formIsValid={formIsValid}
          handleProfileUpdated={handleOnSkillAddFormSubmit}
        />
      }
    ></ModalComponent>
  );
}
