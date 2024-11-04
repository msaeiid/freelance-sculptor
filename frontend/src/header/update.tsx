import { useRef, useState } from "react";
import { FormComponent, ModalComponent } from "../components";
import { lookup } from "../lookup";
import { paths_dict } from "../lookup/url";
import { SocialMedia } from "./socialMedia";
import { Personal } from "./personalInformation";
import { useTranslation } from "react-i18next";
import { languageDirection } from "../main";

// interface UserInterface {
//   first_name: string;
//   last_name: string;
// }
export interface UpdateProfileInterface {
  // user: UserInterface;
  first_name: string;
  last_name: string;
  home_image: URL;
  home_page_title: string;
  cv: URL;
  video: string;
  //Social media
  tweeter: URL;
  facebook: URL;
  linkedin: URL;
  instagram: URL;
  // Section Show control
  quality_public: boolean;
  skill_public: boolean;
  service_public: boolean;
  portfolio_public: boolean;
  review_public: boolean;
  blog_public: boolean;
  contact_public: boolean;
}
interface UpdateHomeInterface {
  profile: UpdateProfileInterface;
  handleCallback: (data: { [k: string]: FormDataEntryValue }) => void;
  messageToShowUser: (message: string, alert_type: string) => void;
}

export function UpdateHomeComponent(props: UpdateHomeInterface) {
  const { profile, handleCallback, messageToShowUser } = props;
  const { t } = useTranslation();
  const [fieldValidationResults, setFieldValidationResults] = useState({
    first_name: true,
    last_name: true,
    home_image: true,
    home_page_title: true,
    cv: true,
    video: true,
    //Social media
    tweeter: true,
    facebook: true,
    linkedin: true,
    instagram: true,
    // Section Show control
    quality_public: true,
    skill_public: true,
    service_public: true,
    portfolio_public: true,
    review_public: true,
    blog_public: true,
    contact_public: true,
  });
  const [formIsValid, setFormIsValid] = useState(true);

  const CloseModal = () => {
    const modalCloseButton = document.getElementById("closeModal");
    modalCloseButton?.click();
  };

  const handleProfileUpdated = (data: { [k: string]: FormDataEntryValue }) => {
    const data_to_send = {
      first_name: data.first_name as string,
      last_name: data.last_name as string,
      home_image: data.home_image as File,
      home_page_title: data.home_page_title as string,
      video: data.video as string,
      cv: data.cv as File,
      tweeter: data.tweeter as string,
      facebook: data.facebook as string,
      linkedin: data.linkedin as string,
      instagram: data.instagram as string,
      // Section Show control
      quality_public: data.quality_public === undefined ? false : true,
      skill_public: data.skill_public === undefined ? false : true,
      service_public: data.service_public === undefined ? false : true,
      portfolio_public: data.portfolio_public === undefined ? false : true,
      review_public: data.review_public === undefined ? false : true,
      blog_public: data.blog_public === undefined ? false : true,
      contact_public: data.contact_public === undefined ? false : true,
    };

    lookup(
      "PUT",
      paths_dict.profile,
      (response, status) => {
        if (status === 200) {
          // CloseModal();
          handleCallback(response);
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
        `Sorry it seems that server is not responding. Please try again later!\n${error}`,
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
      <div className="row">
        <div className="col-lg-6 col-md-6 col-sm-12">
          <div className="mb-3">
            {profile.home_image && (
              <img
                className="img-fluid rounded-circle mx-auto d-block"
                src={`${profile.home_image}`}
                alt="profile image"
                style={{ cursor: "pointer" }}
                width="600px"
                height="600px"
                onClick={handleImageClick}
              />
            )}

            <div
              className={`form-group col-6 ${
                !profile.home_image ? "" : "d-none"
              }`}
            >
              <div className="col-sm-10">
                <input
                  type="file"
                  //defaultValue={home_image.replace(/^.*[\\/]/, "")}
                  id="home_image"
                  name="home_image"
                  accept="image/*"
                  ref={fileInputRef}
                />
              </div>
            </div>
          </div>
        </div>
        <div
          className={`col-lg-6 col-md-6 col-sm-12 ${languageDirection}`}
          dir={`${languageDirection}`}
        >
          <Personal profile={profile} handleOnchange={handleOnchange} />
          <SocialMedia profile={profile} handleOnchange={handleOnchange} />
          <div className="text-center mb-3">
            <a
              className="btn btn-outline-primary"
              href="#"
              onClick={() => {
                document.getElementById("cv")?.click();
              }}
            >
              {/* {cv.replace(/^.*[\\/]/, "")} */}
              <i className="fas fa-file-pdf"></i>
              {t(" CV")}
            </a>

            <div className="form-group row d-none">
              <div className="col-sm-10">
                <input
                  type="file"
                  //defaultValue={cv.replace(/^.*[\\/]/, "")}
                  id="cv"
                  name="cv"
                  accept="application/pdf"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <ModalComponent
      buttonClassName={"btn btn-outline-secondary"}
      buttonFontAwesome={"fas fa-edit"}
      large={true}
      children={
        <FormComponent
          children={from_elements}
          onFormSubmit={handleFormSubmit}
          formIsValid={formIsValid}
        />
      }
    />
  );
}
