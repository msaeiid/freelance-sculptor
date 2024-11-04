import React, { useEffect, useState } from "react";
import { ReturnToHomeComponent } from "../components/returnToHome";
import { ProfileInterface } from "../components/homePage";
import { useTranslation } from "react-i18next";
import { loginUrl, languageDirection, canEdit } from "../main";

interface NavbarInterface {
  profileData?: ProfileInterface;
  home: boolean;
}

export function NavbarComponent(props: NavbarInterface) {
  const { home, profileData } = props;
  const { t } = useTranslation();
  const [showNavbar, setShowNavbar] = useState(false);
  const handleScrollDown = () => {
    if (window.scrollY > 200) {
      setShowNavbar(true);
    } else {
      setShowNavbar(false);
    }
  };
  useEffect(() => {
    if (home) {
      window.addEventListener("scroll", handleScrollDown);
      return () => {
        window.removeEventListener("scroll", handleScrollDown);
      };
    } else {
      setShowNavbar(true);
    }
  }, [home]);

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

  return (
    <>
      <nav
        className={`navbar fixed-top shadow-sm navbar-expand-lg bg-light navbar-light ${languageDirection}`}
        style={showNavbar ? { display: "flex" } : { display: "none" }}
        dir={`${languageDirection}`}
      >
        <a href={`${loginUrl}`} className="navbar-brand ml-lg-3">
          <h1 className="m-0 display-5">
            {profileData && (
              <>
                {" "}
                <span className="text-primary">
                  {profileData.first_name}
                </span>{" "}
                {profileData.last_name}
              </>
            )}
          </h1>
        </a>
        {!home && <ReturnToHomeComponent />}
        {home && (
          <button
            type="button"
            className="navbar-toggler"
            data-toggle="collapse"
            data-target="#navbarCollapse"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        )}
        {home && (
          <>
            <div
              className="collapse navbar-collapse px-lg-3"
              id="navbarCollapse"
            >
              <div className="navbar-nav m-auto py-0">
                <a
                  href="#home"
                  className="nav-item nav-link active"
                  onClick={(event) => {
                    handleOnClick(event, "#home");
                  }}
                >
                  {t("Home")}
                </a>
                <a
                  href="#about"
                  className="nav-item nav-link"
                  onClick={(event) => {
                    handleOnClick(event, "#about");
                  }}
                >
                  {t("About")}
                </a>
                {profileData && (
                  <>
                    {(profileData.quality_public || canEdit) && (
                      <a
                        href="#qualification"
                        className="nav-item nav-link"
                        onClick={(event) => {
                          handleOnClick(event, "#qualification");
                        }}
                      >
                        {t("Quality")}
                      </a>
                    )}
                    {(profileData.skill_public || canEdit) && (
                      <a
                        href="#skill"
                        className="nav-item nav-link"
                        onClick={(event) => {
                          handleOnClick(event, "#skill");
                        }}
                      >
                        {t("Skill")}
                      </a>
                    )}
                    {(profileData.service_public || canEdit) && (
                      <a
                        href="#service"
                        className="nav-item nav-link"
                        onClick={(event) => {
                          handleOnClick(event, "#service");
                        }}
                      >
                        {t("Service")}
                      </a>
                    )}
                    {(profileData.portfolio_public || canEdit) && (
                      <a
                        href="#portfolio"
                        className="nav-item nav-link"
                        onClick={(event) => {
                          handleOnClick(event, "#portfolio");
                        }}
                      >
                        {t("Portfolio")}
                      </a>
                    )}
                    {(profileData.review_public || canEdit) && (
                      <a
                        href="#testimonial"
                        className="nav-item nav-link"
                        onClick={(event) => {
                          handleOnClick(event, "#testimonial");
                        }}
                      >
                        {t("Review")}
                      </a>
                    )}
                    {(profileData.blog_public || canEdit) && (
                      <a
                        href="#blog"
                        className="nav-item nav-link"
                        onClick={(event) => {
                          handleOnClick(event, "#blog");
                        }}
                      >
                        {t("Blog")}
                      </a>
                    )}
                    {(profileData.contact_public || canEdit) && (
                      <a
                        href="#contact"
                        className="nav-item nav-link"
                        onClick={(event) => {
                          handleOnClick(event, "#contact");
                        }}
                      >
                        {t("Contact")}
                      </a>
                    )}
                  </>
                )}
              </div>
              {(profileData?.contact_public || canEdit) && (
                <a
                  href="#footer"
                  className="btn btn-outline-primary d-none d-lg-block"
                  onClick={(event) => {
                    handleOnClick(event, "#footer");
                  }}
                >
                  {t("Contact Me")}
                </a>
              )}
            </div>
          </>
        )}
      </nav>
    </>
  );
}
