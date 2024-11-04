import { Dispatch, SetStateAction, useState } from "react";
import { ModalComponent } from "../components";
import { lookup } from "../lookup/components";
import { EducationInterface } from "./education";
import { EducationFormMaker } from "./formEducation";
import { useTranslation } from "react-i18next";
import { paths_dict } from "../lookup/url";

interface AddEducationInterface {
  setEducations: Dispatch<SetStateAction<EducationInterface[]>>;
  educations: EducationInterface[];
  messageToShowUser: (message: string, alert_type: string) => void;
}

export function AddEducation(props: AddEducationInterface) {
  const { setEducations, educations, messageToShowUser } = props;
  const { t } = useTranslation();

  const CloseModal = () => {
    const modalCloseButton = document.getElementById("closeModal");
    modalCloseButton?.click();
  };

  const handleOnEducationAddFormSubmit = (data: any) => {
    const endpoint = `${paths_dict.education}`;
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
          setEducations([...educations, response]);
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
    university_name: "",
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
        <EducationFormMaker
          education={default_data}
          setFormIsValid={setFormIsValid}
          formIsValid={formIsValid}
          handleProfileUpdated={handleOnEducationAddFormSubmit}
        />
      }
    ></ModalComponent>
  );
}
