import { useTranslation } from "react-i18next";
import { languageDirection } from "../main";
import { ConvertEnglishDigitToPersianOrArabic } from "../lookup/fa";
import { getLocalizedDate } from "../lookup/localize";

export interface EducationInterface {
  id: number;
  title: string;
  university_name: string;
  start_date: Date;
  finish_date: Date;
  until_now: boolean;
  description: string;
}

export function EducationComponent(props: EducationInterface) {
  const {
    title,
    until_now,
    start_date,
    finish_date,
    university_name,
    description,
  } = props;
  const { t } = useTranslation();
  const to_dte = until_now === true ? t("Now") : getLocalizedDate(finish_date);
  const iconStyle =
    languageDirection === "ltr"
      ? { top: "2px", left: "-32px" }
      : { top: "2px", right: "-32px" };
  return (
    <>
      <div className="position-relative mb-4">
        <i
          className="far fa-dot-circle text-primary position-absolute text-primary position-absolute"
          style={iconStyle}
        ></i>
        <h5 className="font-weight-bold mb-1 truncate">
          {ConvertEnglishDigitToPersianOrArabic(title)}
        </h5>
        <p className="mb-2 truncate">
          <strong>
            {ConvertEnglishDigitToPersianOrArabic(university_name)}
          </strong>
        </p>
        <p>
          <small>
            {ConvertEnglishDigitToPersianOrArabic(getLocalizedDate(start_date))}{" "}
            - {ConvertEnglishDigitToPersianOrArabic(to_dte)}
          </small>
        </p>
        <p className="truncate">{description}</p>
      </div>
    </>
  );
}
