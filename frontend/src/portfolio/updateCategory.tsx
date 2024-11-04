import { useState } from "react";
import { lookup } from "../lookup/components";
import { CategoryInterface } from "./category";
import { CategoryFormMaker } from "./formCategory";
import { ModalComponent } from "../components";
import { DeleteCategory } from "./deleteCategory";
import { useTranslation } from "react-i18next";
import { canEdit } from "../main";
import { paths_dict } from "../lookup/url";

interface UpdateCategoryComponentInterface {
  category: CategoryInterface;
  categories: CategoryInterface[];
  setCategories: (data: CategoryInterface[]) => void;
  messageToShowUser?: (message: string, alert_type: string) => void;
  setRefresh?: (refresh: boolean) => void;
}

export function UpdateCategoryComponent(
  props: UpdateCategoryComponentInterface
) {
  const { categories, setCategories, messageToShowUser, category, setRefresh } =
    props;
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<CategoryInterface>({
    id: 0,
    title: "",
  });

  const CloseModal = () => {
    const modalCloseButton = document.getElementById("closeModal");
    modalCloseButton?.click();
  };

  const handleOnCategoryFormSubmit = (data: any, isChanged: boolean) => {
    const endpoint = `${paths_dict.category}${data.id}/`;
    if (isChanged) {
      lookup(
        "PUT",
        endpoint,
        (response, status) => {
          if (status === 200) {
            const updatedGalleries = categories.map((category) => {
              if (category.id === response.id) {
                return response;
              }
              return category;
            });
            setCategories(updatedGalleries);
            // refresh galleries to update page
            if (setRefresh) {
              setRefresh(true);
            }
            if (messageToShowUser) {
              messageToShowUser(
                t("objectUpdated", { title: response.title }),
                "alert alert-success"
              );
            }
          }
        },
        data,
        { "Content-Type": "multipart/form-data" }
      ).catch((error) => {
        if (messageToShowUser) {
          messageToShowUser(
            t(
              `Sorry it seems that server is not responding. Please try again later!\n${error}`
            ),
            "alert alert-danger"
          );
        }
      });
    }
    CloseModal();
  };

  const handleOnCategoryButtonClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    category: CategoryInterface
  ) => {
    event.preventDefault();
    setSelectedCategory(category);
  };

  const handleOnModalClosed = (status: boolean) => {
    if (!status) {
      setSelectedCategory({
        id: 0,
        title: "",
      });
    }
  };
  const [formIsValid, setFormIsValid] = useState(true);
  return (
    <>
      {canEdit && (
        <>
          <ModalComponent
            buttonClassName={`mr-3 ml-3 btn btn-sm btn-outline-secondary`}
            buttonFontAwesome="fas fa-edit"
            onButtonClick={(event) => {
              handleOnCategoryButtonClick(event, category);
            }}
            onModalClose={handleOnModalClosed}
          >
            <CategoryFormMaker
              category={selectedCategory}
              setFormIsValid={setFormIsValid}
              formIsValid={formIsValid}
              handleProfileUpdated={handleOnCategoryFormSubmit}
            />
          </ModalComponent>
          <DeleteCategory
            category={category}
            categories={categories}
            setCategories={setCategories}
            messageToShowUser={messageToShowUser}
          />
        </>
      )}
    </>
  );
}
