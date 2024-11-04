import { ButtonComponent } from "../components";
import { lookup } from "../lookup";
import { paths_dict } from "../lookup/url";
import { CategoryInterface } from "./category";
import { useTranslation } from "react-i18next";

interface DeleteCategoryInterface {
  category: CategoryInterface;
  categories: CategoryInterface[];
  setCategories: (data: any) => void;
  messageToShowUser?: (message: string, alert_type: string) => void;
}
export function DeleteCategory(props: DeleteCategoryInterface) {
  const { category, categories, setCategories, messageToShowUser } = props;
  const { t } = useTranslation();

  const handleLookupCallback = (response: any, status: number) => {
    if (status === 204) {
      // TODO:check
      console.log(response);
      const updatedEducations = categories.filter(
        (cat) => cat.id !== category.id
      );
      setCategories(updatedEducations);
      if (messageToShowUser) {
        messageToShowUser(
          t("objectRemoved", { title: category.title }),
          "alert alert-success"
        );
      }
    }
  };
  const handleOnClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    const confirmation = window.confirm(
      t("removeConfirm", { title: category.title })
    );
    if (confirmation) {
      const endpoint = `${paths_dict.category}${category.id}/`;
      lookup(
        "DELETE",
        endpoint,
        handleLookupCallback,
        {},
        { "Content-Type": "application/json" }
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
