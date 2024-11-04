import { useState } from "react";
import Input from "../components/input";
import { SkillInterface } from "./skill";
import { FormComponent } from "../components";
import { useTranslation } from "react-i18next";

interface SkillFormMakerInterface {
  skill: SkillInterface;
  setFormIsValid: (data: any) => void;
  formIsValid: boolean;
  handleProfileUpdated: (data: any, isChanged: boolean) => void;
}

export function SkillFormMaker(props: SkillFormMakerInterface) {
  const { skill, setFormIsValid, formIsValid, handleProfileUpdated } = props;
  const { t } = useTranslation();

  const [fieldValidationResults, setFieldValidationResults] = useState({
    title: skill.title === "" ? false : true,
    percentage: skill.percentage === null ? false : true,
    color: skill.color === "" ? false : true,
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
      <input type="hidden" name="id" defaultValue={skill.id} />

      <Input
        type="text"
        className="form-control"
        label={t("Title")}
        placeholder={t("Title")}
        name="title"
        defaultValue={skill.title}
        required={true}
        onChange={handleOnchange}
        hide_label={true}
      />
      <div className="row">
        <div className="col-6 col-md-6 col-sm-12">
          <Input
            type="number"
            className="form-control"
            label={t("Percent")}
            placeholder={t("Percent")}
            name="percentage" // Add the name attribute
            defaultValue={skill.percentage}
            required={true}
            onChange={handleOnchange}
          />
        </div>
        <div className="col-6 col-md-6 col-sm-12">
          <Input
            type="color"
            className="form-control form-control-color"
            label={t("Color")}
            defaultValue={skill.color}
            name="color"
            required={true}
            onChange={handleOnchange}
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
