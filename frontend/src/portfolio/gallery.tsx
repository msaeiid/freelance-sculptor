import { useState } from "react";
import { ConvertEnglishDigitToPersianOrArabic } from "../lookup/fa";

export interface GalleryInterface {
  id: number;
  category: string;
  image: URL;
  title: string;
}

export interface GalleryComponentInterface {
  gallery: GalleryInterface;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export function GalleryComponent(props: GalleryComponentInterface) {
  const { gallery, setShowModal } = props;
  const className_ = "col-lg-4 col-md-6 mb-4 portfolio-item";
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageLoaded(true);
  };

  const handleImageClick = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    e.preventDefault(); // Prevent the default anchor behavior
    setShowModal(true); // Show the modal
  };

  return (
    <div className={className_}>
      <div className="same-height-image itemShow ">
        {!imageLoaded && (
          <div className="main-item">
            <div className="animated-background rounded">
              <div className="background-masker"></div>
            </div>
          </div>
        )}
        <img
          className={`portfolio-image img-fluid rounded w-100 ${
            !imageLoaded ? "d-none" : ""
          }`}
          src={`${gallery.image}`}
          alt={ConvertEnglishDigitToPersianOrArabic(gallery.title)}
          onLoad={handleImageLoad}
          onError={handleImageError}
          width="600px"
          height="400px"
          onClick={handleImageClick} // Click event on the image
        />
      </div>
    </div>
  );
}
