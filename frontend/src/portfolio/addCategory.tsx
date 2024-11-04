import { Dispatch, SetStateAction, useState } from "react";
import { lookup } from "../lookup/components";
import { ModalComponent } from "../components";
import { CategoryInterface } from "./category";
import { CategoryFormMaker } from "./formCategory";
import { useTranslation } from "react-i18next";
import { paths_dict } from "../lookup/url";

interface AddCategoryComponentInterface {
  categories: CategoryInterface[];
  setCategories: Dispatch<SetStateAction<CategoryInterface[]>>;
  messageToShowUser: (message: string, alert_type: string) => void;
}
export function AddCategoryComponent(props: AddCategoryComponentInterface) {
  const { setCategories, categories, messageToShowUser } = props;
  const { t } = useTranslation();

  const CloseModal = () => {
    const modalCloseButton = document.getElementById("closeModal");
    modalCloseButton?.click();
  };

  const handleOnPortfolioAddFormSubmit = (data: any) => {
    const endpoint = `${paths_dict.category}`;
    lookup(
      "POST",
      endpoint,
      (response, status) => {
        if (status === 201) {
          CloseModal();
          setCategories([...categories, response]);
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
  };
  const [formIsValid, setFormIsValid] = useState(true);
  return (
    <ModalComponent
      buttonClassName={"btn btn-outline-secondary m-3"}
      buttonFontAwesome={"fas fa-plus"}
      children={
        <CategoryFormMaker
          category={default_data}
          setFormIsValid={setFormIsValid}
          formIsValid={formIsValid}
          handleProfileUpdated={handleOnPortfolioAddFormSubmit}
        />
      }
    ></ModalComponent>
  );
}
