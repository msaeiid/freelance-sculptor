import { useNavigate } from "react-router-dom";
import { languageDirection } from "../main";
import { ConvertEnglishDigitToPersianOrArabic } from "../lookup/fa";

export interface ServiceInterface {
  id: number;
  icon: string;
  title: string;
  short_description: string;
  body: string;
}

export function ServiceComponent(props: ServiceInterface) {
  const { id, icon, title, short_description } = props;
  const navigate = useNavigate();
  const class_nme = `${icon} service-icon bg-primary text-white mr-3`;

  return (
    <>
      <div
        className={`col-lg-4 col-md-4 col-sm-12 text-center my-3 py-4 itemShow rounded ${languageDirection}`}
        dir={`${languageDirection}`}
        onClick={() => {
          navigate(`/service/${id}`, { replace: true });
        }}
      >
        <div className="d-flex align-items-center justify-content-center mb-4">
          <i className={class_nme}></i>
          <h4 className="font-weight-bold mx-2 truncate">
            {ConvertEnglishDigitToPersianOrArabic(title)}
          </h4>
        </div>
        <p className="my-0 mt-2 truncate">
          {ConvertEnglishDigitToPersianOrArabic(short_description)}
        </p>
      </div>
    </>
  );
}
