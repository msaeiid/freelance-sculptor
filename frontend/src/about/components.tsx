import { UpdateAboutComponent } from "./update";
import { HomeAboutInterface } from "../components/homePage";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { canEdit, languageDirection } from "../main";
import { ConvertEnglishDigitToPersianOrArabic } from "../lookup/fa";
import { getLocalizedDate } from "../lookup/localize";

export function About(props: HomeAboutInterface) {
  const { profileData, setProfileData } = props;
  const { t } = useTranslation();

  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageLoaded(true);
  };

  const handleNavItemClick = (
    event: React.MouseEvent<HTMLElement>,
    hash: string
  ) => {
    event.preventDefault();

    const targetElement = document.querySelector(hash);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
  };

  const handleOnClick = (
    event: React.MouseEvent<HTMLElement>,
    section: string
  ) => {
    handleNavItemClick(event, section);
    const navbarCollapse = document.getElementById("navbarCollapse");
    if (navbarCollapse) {
      navbarCollapse.classList.remove("show");
    }
  };

  const handleProfileUpdated = (data: { [k: string]: FormDataEntryValue }) => {
    if (data["about_image"] !== undefined) {
      data["about_image"] = data["about_image"] as string;
    }
    if (data["home_image"] !== undefined) {
      data["home_image"] = data["home_image"] as string;
    }
    if (data["cv"] !== undefined) {
      data["cv"] = data["cv"] as string;
    }
    setProfileData({ ...profileData, ...data });
  };

  const messageToShowUser = (message: string, alert_type: string) => {
    const about_display = document.getElementById("about_display");
    if (about_display) {
      about_display.innerHTML = `<div class='${alert_type}'> <button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times; </button> <strong>${message}</strong></div>`;
    }
  };

  return (
    <div className="container-fluid py-5" id="about">
      <div className="container mt-5">
        <div id="about_display"></div>
        <div className="position-relative d-flex align-items-center justify-content-center">
          <h1
            className="display-1 text-uppercase text-white"
            style={{ WebkitTextStroke: "1px #dee2e6" }}
          >
            {t("About")}
          </h1>
          <h1 className="position-absolute text-uppercase text-primary">
            {t("About Me")}
          </h1>
        </div>
        <div className="col-12 text-center mb-4">
          {canEdit && (
            <UpdateAboutComponent
              profile={profileData}
              handleCallback={handleProfileUpdated}
              messageToShowUser={messageToShowUser}
            />
          )}
        </div>
        <div className="row align-items-center">
          <div className="col-lg-5 pb-4 pb-lg-0">
            {!imageLoaded && (
              <div className="main-item">
                <div className="animated-background rounded">
                  <div className="background-masker"></div>
                </div>
              </div>
            )}
            {profileData.about_image && (
              <img
                className={`img-fluid rounded w-100 ${
                  !imageLoaded ? "d-none" : ""
                }`}
                src={profileData.about_image.toString()}
                alt={`${profileData.first_name} ${profileData.last_name}`}
                onLoad={handleImageLoad}
                onError={handleImageError}
                width="600px"
                height="600px"
              />
            )}
          </div>
          <div
            className={`col-lg-7 ${languageDirection}`}
            dir={`${languageDirection}`}
          >
            {profileData.about_me_title && (
              <h3 className="mb-4">
                {ConvertEnglishDigitToPersianOrArabic(
                  profileData.about_me_title
                )}
              </h3>
            )}
            {profileData.summary && (
              <p>{ConvertEnglishDigitToPersianOrArabic(profileData.summary)}</p>
            )}
            <div className="row mb-3">
              {profileData.first_name && profileData.last_name && (
                <div className="col-sm-6 py-2">
                  <h6 className="truncate">
                    {t("Name")}:{" "}
                    <span className="text-secondary">
                      {profileData.first_name} {profileData.last_name}
                    </span>
                  </h6>
                </div>
              )}
              {profileData.birth_day && (
                <div className="col-sm-6 py-2">
                  <h6>
                    {t("Birthday")}:
                    <span className="text-secondary">
                      {" "}
                      {ConvertEnglishDigitToPersianOrArabic(
                        getLocalizedDate(profileData.birth_day)
                      )}
                    </span>
                  </h6>
                </div>
              )}
              {profileData.degree && (
                <div className="col-sm-6 py-2">
                  <h6 className="truncate">
                    {t("Degree")}:{" "}
                    <span className="text-secondary">{profileData.degree}</span>
                  </h6>
                </div>
              )}
              {profileData.experience_period && (
                <div className="col-sm-6 py-2">
                  <h6 className="truncate">
                    {t("Experience")}:{" "}
                    <span className="text-secondary">
                      {ConvertEnglishDigitToPersianOrArabic(
                        profileData.experience_period
                      )}
                    </span>
                  </h6>
                </div>
              )}
              {profileData.phone && (
                <div className="col-sm-6 py-2">
                  <h6>
                    {t("Phone")}:{" "}
                    <span className="text-secondary" dir="ltr">
                      {ConvertEnglishDigitToPersianOrArabic(profileData.phone)}
                    </span>
                  </h6>
                </div>
              )}
              {profileData.user.email && (
                <div className="col-sm-6 py-2">
                  <h6>
                    {t("Email")}:{" "}
                    <span className="text-secondary">
                      {profileData.user.email}
                    </span>
                  </h6>
                </div>
              )}
              {profileData.address && (
                <div className="col-sm-6 py-2">
                  <h6 className="truncate">
                    {t("Address")}:{" "}
                    <span className="text-secondary">
                      {profileData.address}
                    </span>
                  </h6>
                </div>
              )}
              <div className="col-sm-6 py-2">
                <h6>
                  {t("Freelance")}:{" "}
                  <span className="text-secondary">
                    {profileData.freelance === true
                      ? t("Available")
                      : t("Unavailable")}
                  </span>
                </h6>
              </div>
            </div>
            <a
              href="#footer"
              onClick={(event) => {
                handleOnClick(event, "#footer");
              }}
              className="btn btn-outline-primary mx-2"
              rel="noopener noreferrer"
            >
              {t("Contact Me")}
            </a>
            <a
              href="#blog"
              // onClick={(event) => {
              //   handleNavItemClick(event, "#blog");
              // }}
              className="btn btn-outline-primary mx-2"
              rel="noopener noreferrer"
            >
              {t("Learn More")}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
