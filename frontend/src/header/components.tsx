import { useEffect, useRef, useState } from "react";
import Typed from "typed.js"; // Import the Typed class
import { UpdateHomeComponent } from "./update";
import { VideoModalComponent } from "./videoModal";
import { HomeAboutInterface } from "../components/homePage";
import LanguageSelector from "../components/languageSelection";
import { useTranslation } from "react-i18next";
import { canEdit, languageDirection } from "../main";

export function Home(props: HomeAboutInterface) {
  const { profileData, profileLoaded, setProfileData } = props;
  const { t } = useTranslation();

  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageLoaded(true);
  };

  const typedTextRef = useRef<HTMLDivElement>(null); // Create a ref for the typed text

  useEffect(() => {
    let typedInstance: Typed | null = null;

    const initializeTyped = () => {
      if (typedTextRef.current) {
        const typedOptions = {
          strings: profileData.home_page_title.split(", "),
          typeSpeed: 100,
          backSpeed: 100,
          smartBackspace: false,
          loop: true,
          showCursor: true,
          cursorChar: "⠀",
        };
        typedInstance = new Typed(typedTextRef.current, typedOptions);
      }
    };

    if (profileLoaded) {
      initializeTyped();
    }

    const destroyTyped = () => {
      if (typedInstance) {
        typedInstance.destroy();
      }
    };

    return () => {
      destroyTyped();
    };
  }, [profileLoaded, profileData.home_page_title]);

  const handleProfileUpdated = (data: { [k: string]: FormDataEntryValue }) => {
    setProfileData({ ...profileData, ...data });
  };
  const messageToShowUser = (message: string, alert_type: string) => {
    const header_display = document.getElementById("header_display");
    if (header_display) {
      header_display.innerHTML = `<div class='${alert_type}'> <button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times; </button> <strong>${message}</strong></div>`;
    }
  };

  return (
    <>
      {profileData.video && (
        <VideoModalComponent
          props_video_src={
            profileData.video ? profileData.video.toString() : ""
          }
        />
      )}
      <div
        className="container-fluid bg-primary d-flex align-items-center mb-5"
        id="home"
        style={{ minHeight: "100vh" }}
      >
        <div className="container">
          <LanguageSelector />
          <div id="header_display"></div>
          <div className="col-12 text-center mb-4">
            {canEdit && (
              <>
                <UpdateHomeComponent
                  profile={profileData}
                  handleCallback={handleProfileUpdated}
                  messageToShowUser={messageToShowUser}
                />
              </>
            )}
          </div>
          <div className="row align-items-center">
            <div className="col-lg-5 px-5 pl-lg-0 pb-5 pb-lg-0">
              {profileData.home_image && (
                <img
                  className={`img-fluid w-100 rounded-circle ${
                    !imageLoaded ? "d-none" : ""
                  }`}
                  src={
                    profileData.home_image
                      ? profileData.home_image.toString()
                      : "#"
                  }
                  alt={`${profileData.first_name} ${profileData.last_name}`}
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                  width="600px"
                  height="600px"
                />
              )}
            </div>
            <div className="col-lg-7 text-center text-lg-left">
              {profileData.first_name && profileData.last_name && (
                <>
                  <h3
                    className={`text-white font-weight-normal mb-3 ${languageDirection}`}
                  >
                    {t("I'm")}
                  </h3>
                  <h1
                    className={`display-3 text-uppercase text-primary mb-2 ${languageDirection}`}
                    style={{ WebkitTextStroke: "2px #ffffff" }}
                  >
                    {profileData.first_name} {profileData.last_name}
                  </h1>
                </>
              )}
              {profileData.home_page_title && (
                <h1
                  ref={typedTextRef}
                  className="typed-text-output d-inline font-weight-lighter text-white"
                ></h1>
              )}
              <div className="d-flex align-items-center justify-content-center justify-content-lg-start py-5">
                {profileData.cv && (
                  <a
                    href={profileData.cv.toString()}
                    className="btn btn-outline-light mr-5"
                  >
                    {t("Download CV")}
                  </a>
                )}
                {profileData.video && (
                  <>
                    <button
                      type="button"
                      className="btn-play"
                      data-toggle="modal"
                      data-src={profileData.video ? profileData.video : "#"}
                      data-target="#videoModal"
                    >
                      <span></span>
                    </button>
                    <h5 className="font-weight-normal text-white m-0 ml-4 d-none d-sm-block">
                      {t("Play Video")}
                    </h5>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
