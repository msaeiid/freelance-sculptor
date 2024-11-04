import { Dispatch, SetStateAction, useState } from "react";
import { ModalComponent } from "../components";
import { lookup } from "../lookup/components";
import { ExperienceInterface } from "./experience";
import { ExperienceFormMaker } from "./formExperience";
import { useTranslation } from "react-i18next";
import { paths_dict } from "../lookup/url";

interface AddExperienceInterface {
  setExperiences: Dispatch<SetStateAction<ExperienceInterface[]>>;
  experiences: ExperienceInterface[];
  messageToShowUser: (message: string, alert_type: string) => void;
}

export function AddExperience(props: AddExperienceInterface) {
  const { setExperiences, experiences, messageToShowUser } = props;
  const { t } = useTranslation();

  const CloseModal = () => {
    const modalCloseButton = document.getElementById("closeModal");
    modalCloseButton?.click();
  };

  const handleOnExperienceAddFormSubmit = (data: any) => {
    const endpoint = `${paths_dict.experience}`;
    if (data["until_now"] === "") {
      data["until_now"] = true;
    } else {
      data["until_now"] = false;
    }
    lookup(
      "POST",
      endpoint,
      (response, status) => {
        if (status === 201) {
          CloseModal();
          setExperiences([...experiences, response]);
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
    company_name: "",
    start_date: new Date(),
    finish_date: new Date(),
    until_now: false,
    description: "",
  };

  const [formIsValid, setFormIsValid] = useState(true);

  return (
    <ModalComponent
      large={true}
      buttonClassName={"btn btn-outline-secondary m-3"}
      buttonFontAwesome={"fas fa-plus"}
      children={
        <ExperienceFormMaker
          experience={default_data}
          setFormIsValid={setFormIsValid}
          formIsValid={formIsValid}
          handleProfileUpdated={handleOnExperienceAddFormSubmit}
        />
      }
    ></ModalComponent>
  );
}
