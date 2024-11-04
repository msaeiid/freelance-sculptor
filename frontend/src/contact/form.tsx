import { useState } from "react";
import Input from "../components/input";
import { FormComponent } from "../components";
import { useTranslation } from "react-i18next";
import { languageDirection } from "../main";

interface ContactInterface {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ContactFormComponentInterface {
  formData: ContactInterface;
  setFormIsValid: (data: any) => void;
  formIsValid: boolean;
  handleProfileUpdated: (data: any) => void;
  clearForm: boolean;
}

export function ContactFormComponent(props: ContactFormComponentInterface) {
  const {
    formData,
    setFormIsValid,
    formIsValid,
    handleProfileUpdated,
    clearForm,
  } = props;
  const { t } = useTranslation();

  const [preventValidationAtFirst] = useState(true);
  const [errors, setErrors] = useState<string[]>([]);

  const [fieldValidationResults, setFieldValidationResults] = useState({
    name: formData.name === "" ? false : true,
    email: formData.email === "" ? false : true,
    subject: formData.subject === "" ? false : true,
    message: formData.message === "" ? false : true,
  });

  const handleFormSubmit = (data: { [k: string]: FormDataEntryValue }) => {
    const errors = [];
    // Check if all the fields are valid
    let status = true;
    for (const key in fieldValidationResults) {
      if (!fieldValidationResults[key as keyof typeof fieldValidationResults]) {
        status = false;
        errors.push(key);
      }
    }
    setErrors(errors);
    if (status) {
      // All fields are valid, submit the form
      setFormIsValid(true);
      handleProfileUpdated(data);
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
      <div
        className={`form-row ${languageDirection}`}
        dir={`${languageDirection}`}
      >
        <div className="control-group col-sm-6">
          <Input
            type="text"
            className="form-control"
            label={t("Name")}
            placeholder={t("Name")}
            required={true}
            name="name"
            defaultValue={formData.name}
            onChange={handleOnchange}
            hide_label={true}
            preventValidationAtFirst={preventValidationAtFirst}
          />
        </div>
        <div className="control-group col-sm-6">
          <Input
            type="email"
            className="form-control"
            label={t("Email")}
            placeholder={t("Email")}
            required={true}
            name="email"
            defaultValue={formData.email}
            onChange={handleOnchange}
            hide_label={true}
            preventValidationAtFirst={preventValidationAtFirst}
          />
        </div>
      </div>

      <div
        className={`control-group ${languageDirection}`}
        dir={`${languageDirection}`}
      >
        <Input
          type="text"
          className="form-control"
          label={t("Subject")}
          name="subject"
          placeholder={t("Subject")}
          defaultValue={formData.subject}
          required={true}
          onChange={handleOnchange}
          hide_label={true}
          preventValidationAtFirst={preventValidationAtFirst}
        />
      </div>

      <div
        className={`control-group ${languageDirection}`}
        dir={`${languageDirection}`}
      >
        <Input
          className="form-control"
          rows={7}
          label={t("Message")}
          name="message"
          placeholder={t("Message")}
          defaultValue={formData.message}
          required={true}
          multiline={true}
          onChange={handleOnchange}
          hide_label={true}
          preventValidationAtFirst={preventValidationAtFirst}
        />
      </div>
    </>
  );

  return (
    <FormComponent
      children={FormElement}
      onFormSubmit={handleFormSubmit}
      formIsValid={formIsValid}
      clearForm={clearForm}
      errorMessage={errors}
    />
  );
}
