import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useRef, useState } from "react";
import { BlogInterface } from "./blog";
import { FormComponent } from "../components";
import Input from "../components/input";
import { useTranslation } from "react-i18next";

interface BlogFormMakerInterface {
  blog: BlogInterface;
  setFormIsValid: (data: any) => void;
  formIsValid: boolean;
  handleProfileUpdated: (
    data: any,
    isChanged: boolean,
    bodyChanged: boolean
  ) => void;
}

export function BlogFormMaker(props: BlogFormMakerInterface) {
  const { blog, setFormIsValid, formIsValid, handleProfileUpdated } = props;
  const { t } = useTranslation();

  const [fieldValidationResults, setFieldValidationResults] = useState({
    title: blog.title === "" ? false : true,
  });
  const [body, setBody] = useState(blog.body);
  const [bodyChanged, setBodyChanged] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleBodyChange = (value: string) => {
    setBody(value);
    setBodyChanged(true);
  };

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

  const handleOnchange = (tagName: string, validationResult: boolean) => {
    setFieldValidationResults((prevResult) => ({
      ...prevResult,
      [tagName]: validationResult,
    }));
  };

  const FormElement = (
    <>
      <input type="hidden" name="id" defaultValue={blog.id} />
      <input type="hidden" name="body" defaultValue={body} />

      <Input
        type="text"
        className="form-control"
        label={t("Title")}
        placeholder={t("Title")}
        name="title"
        defaultValue={blog.title}
        required={true}
        onChange={handleOnchange}
        hide_label={true}
      />

      <div
        className={`col-12 mb-5 ${
          typeof blog.images === "string" ? "" : "d-none"
        }`}
      >
        <img
          className="d-flex img-rounded img-fluid m-auto h-auto"
          src={`${blog.images}`}
          alt={blog.title}
          width="600px"
          height="400px"
          onClick={handleImageClick}
          style={{ cursor: "pointer" }}
        />
      </div>

      <div
        className={`form-group row ${
          typeof blog.images === "string" ? "d-none" : ""
        }`}
      >
        <input
          className="mb-4 mx-auto"
          type="file"
          id={blog.title}
          name="images"
          accept="image/*"
          ref={fileInputRef}
        />
      </div>

      <div className="form-group">
        <ReactQuill
          value={body}
          onChange={handleBodyChange}
          modules={BlogFormMaker.modules}
          formats={BlogFormMaker.formats}
        />
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

BlogFormMaker.modules = {
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

BlogFormMaker.formats = [
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
