import { useRef, useState } from "react";
import { SelectComponent } from "../components/selection";
import { CategoryInterface } from "./category";
import Input from "../components/input";
import { FormComponent } from "../components";
import { GalleryInterface } from "./gallery";
import { useTranslation } from "react-i18next";

interface GalleryFormMakeInterface {
  allCategories: CategoryInterface[];
  gallery: GalleryInterface;
  setFormIsValid: (data: any) => void;
  formIsValid: boolean;
  handleProfileUpdated: (data: any, isChanged: boolean) => void;
}

export function GalleryFormMaker(props: GalleryFormMakeInterface) {
  const {
    gallery,
    allCategories,
    setFormIsValid,
    formIsValid,
    handleProfileUpdated,
  } = props;
  const { t } = useTranslation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const [fieldValidationResults, setFieldValidationResults] = useState({
    title: gallery.title === "" ? false : true,
    category: gallery.category === "" ? false : true,
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
      <input type="hidden" name="id" defaultValue={gallery.id} />

      <div
        className={`row col-12 mb-5 ${
          typeof gallery.image === "string" ? "" : "d-none"
        }`}
      >
        <img
          className="img-rounded img-fluid mx-auto d-block"
          src={`${gallery.image}`}
          alt={gallery.title}
          width="600px"
          height="400px"
          onClick={handleImageClick}
          style={{ cursor: "pointer" }}
        />
      </div>

      <input
        className={`mb-4 ${typeof gallery.image === "string" ? "d-none" : ""}`}
        type="file"
        id={gallery.title}
        name="image"
        accept="image/*"
        ref={fileInputRef}
      />

      <div className="form-group row">
        <label htmlFor="category" className="col-sm-3 col-form-label">
          {t("Category")}
        </label>
        <div className="col-sm-9">
          <SelectComponent
            name={"category"}
            values={allCategories}
            selected={gallery.category}
            tagClassName={"form-control"}
            required={true}
            onChange={handleOnchange}
          />
        </div>
      </div>

      <Input
        type="text"
        className="form-control"
        label={t("Title")}
        placeholder={t("Title")}
        name="title"
        defaultValue={gallery.title}
        required={true}
        onChange={handleOnchange}
      />
      <p className="text-primary mb-2">
        {t(
          `Please make sure title is related to the image because it will be used as alt tag for image which is important for SEO`
        )}
      </p>
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
