import { Dispatch, SetStateAction, useState } from "react";
import { lookup } from "../lookup/components";
import { ModalComponent } from "../components";
import { ServiceInterface } from "./service";
import { ServiceFormMaker } from "./form";
import { useTranslation } from "react-i18next";
import { paths_dict } from "../lookup/url";

interface AddServiceComponentInterface {
  setServices: Dispatch<SetStateAction<ServiceInterface[]>>;
  services: ServiceInterface[];
  messageToShowUser: (message: string, alert_type: string) => void;
}
export function AddServiceComponent(props: AddServiceComponentInterface) {
  const { setServices, messageToShowUser, services } = props;
  const { t } = useTranslation();
  const CloseModal = () => {
    const modalCloseButton = document.getElementById("closeModal");
    modalCloseButton?.click();
  };
  const handleOnServiceAddFormSubmit = (data: any) => {
    const endpoint = `${paths_dict.service}`;
    lookup(
      "POST",
      endpoint,
      (response, status) => {
        if (status === 201) {
          CloseModal();
          setServices([...services, response]);
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
    icon: "",
    title: "",
    short_description: "",
    body: "",
  };
  const [formIsValid, setFormIsValid] = useState(true);
  return (
    <ModalComponent
      buttonClassName={"btn btn-outline-primary m-3"}
      buttonFontAwesome={"fas fa-plus"}
      large={true}
      children={
        <ServiceFormMaker
          service={default_data}
          setFormIsValid={setFormIsValid}
          formIsValid={formIsValid}
          handleProfileUpdated={handleOnServiceAddFormSubmit}
        />
      }
    ></ModalComponent>
  );
}
