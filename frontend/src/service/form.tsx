import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ServiceInterface } from "./service";
import { useState } from "react";
import Input from "../components/input";
import { FormComponent } from "../components";
import { useTranslation } from "react-i18next";
import { languageDirection } from "../main";
interface ServiceFormMakerInterface {
  service: ServiceInterface;
  setFormIsValid: (data: any) => void;
  formIsValid: boolean;
  handleProfileUpdated: (
    data: any,
    isChanged: boolean,
    bodyChanged: boolean
  ) => void;
}

export function ServiceFormMaker(props: ServiceFormMakerInterface) {
  const { service, setFormIsValid, formIsValid, handleProfileUpdated } = props;
  const { t } = useTranslation();
  const [body, setBody] = useState(service.body);
  const [bodyChanged, setBodyChanged] = useState(false);

  const [fieldValidationResults, setFieldValidationResults] = useState({
    title: service.title === "" ? false : true,
    icon: service.icon === "" ? false : true,
    short_description: service.short_description === "" ? false : true,
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
      handleProfileUpdated(data, isChanged, bodyChanged);
    } else {
      // Some fields are invalid, update the state
      setFormIsValid(false);
    }
  };

  const handleBodyChange = (value: string) => {
    setBody(value);
    setBodyChanged(true);
  };

  const handleOnchange = (tagName: string, validationResult: boolean) => {
    setFieldValidationResults((prevResult) => ({
      ...prevResult,
      [tagName]: validationResult,
    }));
  };

  const FormElement = (
    <div className={`${languageDirection}`} dir={`${languageDirection}`}>
      <input type="hidden" name="id" defaultValue={service.id} />
      <input type="hidden" name="body" defaultValue={body} />
      <div className="row">
        <div className="col-lg-6 col-md-12 col-sm-12">
          <Input
            type="text"
            className="form-control"
            label={t("Title")}
            placeholder={t("Title")}
            name="title"
            defaultValue={service.title}
            required={true}
            onChange={handleOnchange}
            hide_label={true}
          />
        </div>
        <div className="col-lg-6 col-md-12 col-sm-12">
          <Input
            type="text"
            className="form-control"
            label={t("Icon")}
            placeholder={t("fontawesome icon, example: fa fa-laptop")}
            name="icon"
            defaultValue={service.icon}
            required={true}
            onChange={handleOnchange}
            hide_label={true}
          />
        </div>
      </div>

      <Input
        type="text"
        className="form-control"
        label={t("Short Description")}
        placeholder={t("Short Description")}
        name="short_description"
        defaultValue={service.short_description}
        required={true}
        onChange={handleOnchange}
        hide_label={true}
      />

      <div className="form-group">
        <ReactQuill
          value={body}
          onChange={handleBodyChange}
          modules={ServiceFormMaker.modules}
          formats={ServiceFormMaker.formats}
        />
      </div>
    </div>
  );
  return (
    <FormComponent
      children={FormElement}
      onFormSubmit={handleFormSubmit}
      formIsValid={formIsValid}
    />
  );
}

ServiceFormMaker.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    [
      { align: "" },
      { align: "center" },
      { align: "right" },
      { align: "justify" },
    ],
    ["link", "image", "video"],
    ["clean"],
    ["code-block"],
  ],
};

ServiceFormMaker.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "indent",
  "bullet",
  "align",
  "link",
  "image",
  "video",
  "code-block",
];
