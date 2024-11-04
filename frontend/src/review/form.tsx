import { useRef, useState } from "react";
import { TestimonialInterface } from "./testimonial";
import Input from "../components/input";
import { FormComponent } from "../components";
import { useTranslation } from "react-i18next";

interface ReviewFormMakerInterface {
  review: TestimonialInterface;
  setFormIsValid: (data: any) => void;
  formIsValid: boolean;
  handleProfileUpdated: (data: any, isChanged: boolean) => void;
}

export function ReviewFormMaker(props: ReviewFormMakerInterface) {
  const { review, setFormIsValid, formIsValid, handleProfileUpdated } = props;
  const { t } = useTranslation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const [fieldValidationResults, setFieldValidationResults] = useState({
    title: review.title === "" ? false : true,
    profession: review.profession === "" ? false : true,
    comment: review.comment === "" ? false : true,
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
      <input type="hidden" name="id" defaultValue={review.id} />

      <div className="row">
        <div className="col-lg-6 col-md-6 col-sm-12">
          <div className="mb-5">
            <img
              className={`img-fluid rounded-circle m-auto h-auto ${
                typeof review.avatar === "string" ? "" : "d-none"
              }`}
              src={`${review.avatar}`}
              alt={review.title}
              width="100px"
              height="100px"
              onClick={handleImageClick}
              style={{ cursor: "pointer" }}
            />
          </div>

          <div
            className={`form-group row ${
              typeof review.avatar === "string" ? "d-none" : ""
            }`}
          >
            <input
              className="mb-4 mx-auto"
              type="file"
              id={review.title}
              name="avatar"
              accept="image/*"
              ref={fileInputRef}
            />
          </div>
          <Input
            type="text"
            className="form-control"
            label={t("Name")}
            placeholder={t("Name")}
            name="title" // Add the name attribute
            defaultValue={review.title}
            required={true}
            onChange={handleOnchange}
            hide_label={true}
          />
          <Input
            type="text"
            className="form-control"
            label={t("Profession")}
            placeholder={t("Profession")}
            name="profession" // Add the name attribute
            defaultValue={review.profession}
            required={true}
            onChange={handleOnchange}
            hide_label={true}
          />
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12">
          <Input
            className="form-control"
            label={t("Comment")}
            placeholder={t("Comment")}
            defaultValue={review.comment}
            rows={10}
            name="comment"
            multiline={true}
            required={true}
            onChange={handleOnchange}
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
