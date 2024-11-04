import { Dispatch, SetStateAction, useState } from "react";
import { lookup } from "../lookup/components";
import { ModalComponent } from "../components";
import { GalleryInterface } from "./gallery";
import { GalleryFormMaker } from "./formGallery";
import { CategoryInterface } from "./category";
import { useTranslation } from "react-i18next";
import { paths_dict } from "../lookup/url";

interface AddPortfolioComponentInterface {
  categories: CategoryInterface[];
  setGalleries: Dispatch<SetStateAction<GalleryInterface[]>>;
  galleries: GalleryInterface[];
  messageToShowUser: (message: string, alert_type: string) => void;
}
export function AddPortfolioComponent(props: AddPortfolioComponentInterface) {
  const { setGalleries, categories, galleries, messageToShowUser } = props;
  const { t } = useTranslation();

  const CloseModal = () => {
    const modalCloseButton = document.getElementById("closeModal");
    modalCloseButton?.click();
  };

  const handleOnPortfolioAddFormSubmit = (data: any) => {
    const endpoint = `${paths_dict.gallery}`;
    if (data.image.name === "") {
      delete data.image;
    }
    lookup(
      "POST",
      endpoint,
      (response, status) => {
        if (status === 201) {
          CloseModal();
          setGalleries([...galleries, response]);
          messageToShowUser(
            t("objectAdded", { title: response.title }),
            "alert alert-success"
          );
        }
      },
      data,
      { "Content-Type": "multipart/form-data" }
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
    category: "",
    image: new URL("", window.location.href),
  };
  const [formIsValid, setFormIsValid] = useState(true);
  return (
    <ModalComponent
      buttonClassName={"btn btn-outline-secondary m-3"}
      buttonFontAwesome={"fas fa-plus"}
      children={
        <GalleryFormMaker
          gallery={default_data}
          allCategories={categories}
          setFormIsValid={setFormIsValid}
          formIsValid={formIsValid}
          handleProfileUpdated={handleOnPortfolioAddFormSubmit}
        />
      }
    ></ModalComponent>
  );
}
