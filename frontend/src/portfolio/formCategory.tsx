import { useState } from "react";
import Input from "../components/input";
import { CategoryInterface } from "./category";
import { FormComponent } from "../components";
import { useTranslation } from "react-i18next";

interface GalleryFormMakeInterface {
  category: CategoryInterface;
  setFormIsValid: (data: any) => void;
  formIsValid: boolean;
  handleProfileUpdated: (data: any, isChanged: boolean) => void;
}

export function CategoryFormMaker(props: GalleryFormMakeInterface) {
  const { category, setFormIsValid, formIsValid, handleProfileUpdated } = props;
  const { t } = useTranslation();

  const [fieldValidationResults, setFieldValidationResults] = useState({
    title: category.title === "" ? false : true,
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
      <input type="hidden" name="id" defaultValue={category.id} />

      <Input
        type="text"
        className="form-control"
        label={t("Title")}
        placeholder={t("Title")}
        name="title" // Add the name attribute
        defaultValue={category.title}
        required={true}
        onChange={handleOnchange}
      />
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
