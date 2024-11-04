import { useState } from "react";
import { lookup } from "../lookup/components";
import { ModalComponent } from "../components";
import { GalleryInterface } from "./gallery";
import { DeletePortfolio } from "./deleteGallery";
import { GalleryFormMaker } from "./formGallery";
import { CategoryInterface } from "./category";
import { useTranslation } from "react-i18next";
import { canEdit } from "../main";
import { paths_dict } from "../lookup/url";
import { ConvertEnglishDigitToPersianOrArabic } from "../lookup/fa";

interface UpdatePortfolioComponentInterface {
  activeCategory: string;
  galleries: GalleryInterface[];
  setGalleries: (data: GalleryInterface[]) => void;
  categories: CategoryInterface[];
  messageToShowUser: (message: string, alert_type: string) => void;
}

export function UpdatePortfolioComponent(
  props: UpdatePortfolioComponentInterface
) {
  const {
    galleries,
    setGalleries,
    categories,
    activeCategory,
    messageToShowUser,
  } = props;
  const { t } = useTranslation();
  const [selectedGallery, setSelectedGallery] = useState<GalleryInterface>({
    id: 0,
    title: "",
    category: "",
    image: new URL("", window.location.href),
  });

  const CloseModal = () => {
    const modalCloseButton = document.getElementById("closeModal");
    modalCloseButton?.click();
  };

  const handleOnPortfolioFormSubmit = (data: any, isChanged: boolean) => {
    const endpoint = `${paths_dict.gallery}${data.id}/`;
    if (data.image.name === "") {
      delete data.image;
    }
    if (isChanged) {
      lookup(
        "PUT",
        endpoint,
        (response, status) => {
          if (status === 200) {
            const updatedGalleries = galleries.map((gallery) => {
              if (gallery.id === response.id) {
                return response;
              }
              return gallery;
            });
            setGalleries(updatedGalleries);
            messageToShowUser(
              t("objectUpdated", { title: response.title }),
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
    }
    CloseModal();
  };

  const handleOnPortfolioButtonClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    gallery: GalleryInterface
  ) => {
    event.preventDefault();
    setSelectedGallery(gallery);
  };

  const handleOnModalClosed = (status: boolean) => {
    if (!status) {
      setSelectedGallery({
        id: 0,
        title: "",
        category: "",
        image: new URL("", window.location.href),
      });
    }
  };
  const [formIsValid, setFormIsValid] = useState(true);
  return (
    <div className="row portfolio-container">
      {galleries.map((gallery: GalleryInterface, index: number) => (
        <div
          key={`${index}-${gallery.id}`}
          className={`col-lg-4 col-md-6 ${
            activeCategory === "All" || activeCategory === gallery.category
              ? `col-lg-4 col-md-6 mb-0 portfolio-item ${gallery.category}`
              : `col-lg-4 col-md-6 mb-0 portfolio-item d-none ${gallery.category}`
          }`}
        >
          <div className="position-relative overflow-hidden mb-0">
            <h5 className="text-center text-primary">
              {ConvertEnglishDigitToPersianOrArabic(gallery.title)}
            </h5>
            <img
              className="img-fluid rounded w-100"
              src={`${gallery.image}`}
              alt={gallery.title}
              width="600px"
              height="400px"
            />
            {canEdit && (
              <>
                <ModalComponent
                  buttonClassName={"mr-3 ml-3 btn btn-sm btn-outline-secondary"}
                  buttonFontAwesome={"fas fa-edit"}
                  onButtonClick={(event) => {
                    handleOnPortfolioButtonClick(event, gallery);
                  }}
                  onModalClose={handleOnModalClosed}
                >
                  <GalleryFormMaker
                    gallery={selectedGallery}
                    allCategories={categories}
                    setFormIsValid={setFormIsValid}
                    formIsValid={formIsValid}
                    handleProfileUpdated={handleOnPortfolioFormSubmit}
                  />
                </ModalComponent>
                <DeletePortfolio
                  gallery={gallery}
                  galleries={galleries}
                  setGalleries={setGalleries}
                  messageToShowUser={messageToShowUser}
                />
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
