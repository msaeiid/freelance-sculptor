import { HomeAboutInterface } from "../components/homePage";
import { useTranslation } from "react-i18next";
import {
  developer_name,
  developer_url,
  languageDirection,
  site_domain,
} from "../main";

export function Footer(props: HomeAboutInterface) {
  const { profileData } = props;
  const { t } = useTranslation();
  return (
    <div
      className="container-fluid bg-primary text-white py-4 px-sm-3 px-md-5"
      id="footer"
    >
      <div className="container text-center">
        <div className="d-flex justify-content-center mb-4">
          {profileData.tweeter && (
            <a
              className="btn btn-light btn-social mx-1"
              href={`${profileData.tweeter}`}
            >
              <i className="fab fa-twitter"></i>
            </a>
          )}
          {profileData.facebook && (
            <a
              className="btn btn-light btn-social mx-1"
              href={`${profileData.facebook}`}
            >
              <i className="fab fa-facebook-f"></i>
            </a>
          )}
          {profileData.linkedin && (
            <a
              className="btn btn-light btn-social mx-1"
              href={`${profileData.linkedin}`}
            >
              <i className="fab fa-linkedin-in"></i>
            </a>
          )}
          {profileData.instagram && (
            <a
              className="btn btn-light btn-social mx-1"
              href={`${profileData.instagram}`}
            >
              <i className="fab fa-instagram"></i>
            </a>
          )}
          {profileData.phone && (
            <a
              className="btn btn-light btn-social mx-1"
              href={`tel:${profileData.phone}`}
            >
              <i className="fa fa-phone"></i>
            </a>
          )}
          {profileData.user.email && (
            <a
              className="btn btn-light btn-social mx-1"
              href={`mailto:${profileData.user.email}`}
            >
              <i className="fa fa-envelope"></i>
            </a>
          )}
        </div>
        <p className="m-0" dir={`${languageDirection}`}>
          &copy;{" "}
          <a className="text-white font-weight-bold" href={`${site_domain}`}>
            {profileData.first_name} {profileData.last_name}{" "}
          </a>
          {t("All Rights Reserved. Designed by")}{" "}
          <a className="text-white font-weight-bold" href={`${developer_url}`}>
            {`${developer_name}`}
          </a>
        </p>
      </div>
    </div>
  );
}
