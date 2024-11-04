import { useRef, useState } from "react";
import { FormComponent, ModalComponent } from "../components";
import { lookup } from "../lookup";
import { paths_dict } from "../lookup/url";
import Input from "../components/input";
import { ProfileInterface } from "../components/homePage";
import { useTranslation } from "react-i18next";
import { languageDirection } from "../main";

export interface UpdateAboutInterface {
  profile: ProfileInterface;
  handleCallback: (data: { [k: string]: FormDataEntryValue }) => void;
  messageToShowUser: (message: string, alert_type: string) => void;
}

export function UpdateAboutComponent(props: UpdateAboutInterface) {
  const { profile, handleCallback, messageToShowUser } = props;
  const { t } = useTranslation();
  const [fieldValidationResults, setFieldValidationResults] = useState({
    about_image: true,
    about_me_title: true,
    summary: true,
    first_name: true,
    last_name: true,
    birth_day: true,
    degree: true,
    experience_period: true,
    phone: true,
    email: true,
    address: true,
    freelance: true,
  });
  const [formIsValid, setFormIsValid] = useState(true);

  const CloseModal = () => {
    const modalCloseButton = document.getElementById("closeModal");
    modalCloseButton?.click();
  };
  const handleProfileUpdated = (data: { [k: string]: FormDataEntryValue }) => {
    const data_to_send = {
      about_image: data.about_image as File,
      about_me_title: data.about_me_title as string,
      summary: data.summary as string,
      birth_day: new Date(data.birth_day as string),
      degree: data.degree as string,
      experience_period: data.experience_period as string,
      phone: data.phone as string,
      email: data.email as string,
      address: data.address as string,
      freelance: data.freelance === undefined ? false : true,
    };

    lookup(
      "PUT",
      paths_dict.profile,
      (response, status) => {
        if (status === 200) {
          handleCallback(response);
          // CloseModal();
          messageToShowUser(
            "Your profile has been updated.",
            "alert alert-success"
          );
        }
      },
      data_to_send,
      { "Content-Type": "multipart/form-data" }
    ).catch((error) => {
      messageToShowUser(
        `Sorry it seems that server is not responding. Please try again later! \n ${error}`,
        "alert alert-danger"
      );
    });
  };

  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleOnchange = (tagName: string, validationResult: boolean) => {
    setFieldValidationResults((prevResult) => ({
      ...prevResult,
      [tagName]: validationResult,
    }));
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
      if (isChanged) {
        handleProfileUpdated(data);
      }
    } else {
      // Some fields are invalid, update the state
      setFormIsValid(false);
    }
    CloseModal();
  };

  const from_elements = (
    <>
      <div className="row mt-5">
        <div className="col-lg-6 col-md-6 col-sm-12 mb-4">
          {profile.about_image && (
            <img
              className="img-fluid  d-block"
              src={`${profile.about_image}`}
              alt="profile image"
              width="600px"
              height="600px"
              onClick={handleImageClick}
              style={{ cursor: "pointer" }}
            />
          )}
          <div
            className={`form-group col-6 ${
              !profile.about_image ? "" : "d-none"
            }`}
          >
            <input
              type="file"
              id="about_image"
              name="about_image"
              accept="image/*"
              ref={fileInputRef}
            />
          </div>
        </div>
        <div
          className={`col-lg-6 col-md-6 col-sm-12 ${languageDirection}`}
          dir={`${languageDirection}`}
        >
          <Input
            type="text"
            className="form-control"
            label={t("About Me Title")}
            placeholder={t("About Me Title")}
            name="about_me_title" // Add the name attribute
            defaultValue={
              profile.about_me_title && profile.about_me_title.toString()
            }
            onChange={handleOnchange}
            hide_label={true}
          />
          <Input
            type="text"
            className="form-control"
            label={t("Degree")}
            placeholder={t("Degree")}
            defaultValue={profile.degree}
            name="degree"
            onChange={handleOnchange}
            hide_label={true}
          />
          <span dir="ltr">
            <Input
              type="text"
              className="form-control"
              label={t("Phone")}
              name="phone"
              defaultValue={profile.phone}
              placeholder={t("Phone")}
              onChange={handleOnchange}
              hide_label={true}
            />
          </span>
          <Input
            type="text"
            className="form-control"
            label={t("Address")}
            placeholder={t("Address")}
            name="address"
            defaultValue={profile.address}
            onChange={handleOnchange}
            hide_label={true}
          />

          <Input
            type="date"
            className="form-control"
            label={t("Birthday")}
            placeholder={t("Birthday")}
            name="birth_day"
            defaultValue={
              new Date(profile.birth_day).toISOString().split("T")[0]
            }
            onChange={handleOnchange}
          />
          <Input
            className="form-check-input"
            type="checkbox"
            role="switch"
            defaultChecked={profile.freelance}
            label={t("Freelance")}
            name="freelance"
            onChange={handleOnchange}
          />

          <Input
            type="text"
            className="form-control"
            label={t("Experience Period")}
            placeholder={t("Experience Period")}
            name="experience_period"
            defaultValue={profile.experience_period}
            onChange={handleOnchange}
            hide_label={true}
          />
          <Input
            type="email"
            className="form-control"
            label={t("Email")}
            placeholder={t("Email")}
            name="email"
            defaultValue={profile.user.email}
            onChange={handleOnchange}
            hide_label={true}
          />
        </div>
      </div>
      <Input
        type="text"
        className={`form-control ${languageDirection}`}
        label={t("Summary")}
        placeholder={t("Summary")}
        defaultValue={profile.summary}
        rows={5}
        name="summary"
        onChange={handleOnchange}
        multiline={true}
        hide_label={true}
      />
    </>
  );

  return (
    <ModalComponent
      large={true}
      children={
        <FormComponent
          children={from_elements}
          onFormSubmit={handleFormSubmit}
          formIsValid={formIsValid}
        />
      }
      buttonClassName={"btn btn-outline-primary"}
      buttonFontAwesome={"fas fa-edit"}
    />
  );
}
