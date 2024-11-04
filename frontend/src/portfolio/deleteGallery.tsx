import { ButtonComponent } from "../components";
import { lookup } from "../lookup";
import { paths_dict } from "../lookup/url";
import { GalleryInterface } from "./gallery";
import { useTranslation } from "react-i18next";

interface DeletePortfolioInterface {
  gallery: GalleryInterface;
  galleries: GalleryInterface[];
  setGalleries: (data: any) => void;
  messageToShowUser: (message: string, alert_type: string) => void;
}
export function DeletePortfolio(props: DeletePortfolioInterface) {
  const { gallery, galleries, setGalleries, messageToShowUser } = props;
  const { t } = useTranslation();

  const handleLookupCallback = (response: any, status: number) => {
    if (status === 204) {
      // TODO:check
      console.log(response);
      const updatedGalleries = galleries.filter((gal) => gal.id !== gallery.id);
      setGalleries(updatedGalleries);
      messageToShowUser(
        t("objectRemoved", { title: gallery.title }),
        "alert alert-success"
      );
    }
  };
  const handleOnClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    const confirmation = window.confirm(
      t("removeConfirm", { title: gallery.title })
    );
    if (confirmation) {
      const endpoint = `${paths_dict.gallery}${gallery.id}/`;
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
