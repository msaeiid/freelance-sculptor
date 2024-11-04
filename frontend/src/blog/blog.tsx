import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ConvertEnglishDigitToPersianOrArabic } from "../lookup/fa";
import { getLocalizedDate } from "../lookup/localize";
export interface BlogInterface {
  id: number;
  images: URL;
  title: string;
  created_at: Date;
  body: string;
}

export function BlogComponent(props: BlogInterface) {
  const { id, created_at, images, title } = props;
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageLoaded(true);
  };

  return (
    <div
      className="col-lg-4 col-md-6 col-sm-12 text-center my-3 px-2 pb-3 itemShow rounded"
      onClick={() => {
        navigate(`/blog/${id}`, { replace: true });
      }}
    >
      <div className="position-relative same-height-image">
        {!imageLoaded && (
          <div className="main-item">
            <div className="animated-background rounded">
              <div className="background-masker"></div>
            </div>
          </div>
        )}
        <img
          className={`img-fluid rounded w-100 ${!imageLoaded ? "d-none" : ""}`}
          src={`${images}`}
          alt={ConvertEnglishDigitToPersianOrArabic(title)}
          onLoad={handleImageLoad}
          onError={handleImageError}
          width="600px"
          height="400px"
        />
        <div className="blog-date">
          <h4 className="font-weight-bold mb-n1">
            {ConvertEnglishDigitToPersianOrArabic(
              getLocalizedDate(created_at, true, false)
            )}
          </h4>
          <small className="text-white text-uppercase">
            {ConvertEnglishDigitToPersianOrArabic(
              getLocalizedDate(created_at, false, true)
            )}
          </small>
        </div>
      </div>
      <p className="my-0 mt-2 truncate">
        {ConvertEnglishDigitToPersianOrArabic(title)}
      </p>
    </div>
  );
}
