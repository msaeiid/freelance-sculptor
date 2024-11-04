import { useState } from "react";
import Input from "../components/input";
import { EducationInterface } from "./education";
import { FormComponent } from "../components";
import { useTranslation } from "react-i18next";
import { ConvertEnglishDigitToPersianOrArabic } from "../lookup/fa";

interface EducationFormMakerInterface {
  education: EducationInterface;
  setFormIsValid: (data: any) => void;
  formIsValid: boolean;
  handleProfileUpdated: (data: any, isChanged: boolean) => void;
}

export function EducationFormMaker(props: EducationFormMakerInterface) {
  const { education, setFormIsValid, formIsValid, handleProfileUpdated } =
    props;
  const { t } = useTranslation();

  const [fieldValidationResults, setFieldValidationResults] = useState({
    title: education.title === "" ? false : true,
    university_name: education.university_name === "" ? false : true,
    start_date: true,
    finish_date: true,
    until_now: true,
    description: true,
  });

  const handleFormSubmit = (
    data: { [k: string]: FormDataEntryValue },
    isChanged: boolean
  ) => {
    // Check if all the fields are valid
    let status = true;
    for (const key in fieldValidationResults) {
      if (!fieldValidationResults[key as keyof typeof fieldValidationResults]) {
        status = false;
        break;
      }
    }
    if (status) {
      // All fields are valid, submit the form
      setFormIsValid(true);
      handleProfileUpdated(data, isChanged);
    } else {
      // Some fields are invalid, update the state
      setFormIsValid(false);
    }
  };

  const handleOnchange = (tagName: string, validationResult: boolean) => {
    setFieldValidationResults((prevResult) => ({
      ...prevResult,
      [tagName]: validationResult,
    }));
  };

  const FormElement = (
    <>
      <input type="hidden" name="id" defaultValue={education.id} />

      <div className="row">
        <div className="col-lg-6 col-md-12 col-sm-12">
          <Input
            type="text"
            className="form-control"
            label={t("Title")}
            placeholder={t("Title")}
            name="title"
            defaultValue={ConvertEnglishDigitToPersianOrArabic(education.title)}
            required={true}
            onChange={handleOnchange}
            hide_label={true}
          />

          <Input
            type="text"
            className="form-control"
            label={t("University")}
            placeholder={t("University")}
            name="university_name"
            defaultValue={ConvertEnglishDigitToPersianOrArabic(
              education.university_name
            )}
            required={true}
            onChange={handleOnchange}
            hide_label={true}
          />
          <Input
            type="date"
            className="form-control"
            label={t("From")}
            placeholder={t("From")}
            name="start_date"
            defaultValue={
              new Date(education.start_date).toISOString().split("T")[0]
            }
            onChange={handleOnchange}
          />
          <Input
            type="date"
            className="form-control"
            label={t("To")}
            placeholder={t("To")}
            name="finish_date"
            defaultValue={
              new Date(education.finish_date).toISOString().split("T")[0]
            }
            onChange={handleOnchange}
          />
          <Input
            className="form-check-input"
            type="checkbox"
            defaultChecked={education.until_now}
            label={t("Now")}
            name="until_now"
            onChange={handleOnchange}
          />
        </div>

        <div className="col-lg-6 col-md-12 col-sm-12">
          <Input
            className="form-control"
            label={t("Description")}
            defaultValue={ConvertEnglishDigitToPersianOrArabic(
              education.description
            )}
            placeholder={t("Description")}
            rows={10}
            name="description"
            onChange={handleOnchange}
            multiline={true}
            hide_label={true}
          />
        </div>
      </div>
    </>
  );

  return (
    <FormComponent
      children={FormElement}
      onFormSubmit={handleFormSubmit}
      formIsValid={formIsValid}
    />
  );
}
