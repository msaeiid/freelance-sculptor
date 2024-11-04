import { lookup } from "../lookup/components";
import { useTranslation } from "react-i18next";

import { ContactFormComponent } from "./form";
import { useEffect, useState } from "react";
import { paths_dict } from "../lookup/url";
import { HideOrShowSection } from "../components/HideOrShowSection";
import { Link } from "react-router-dom";
import { ButtonComponent } from "../components";
import { ConvertEnglishDigitToPersianOrArabic } from "../lookup/fa";
import { languageDirection } from "../main";

interface ContactInterface {
  canEdit: boolean;
  status: boolean;
}

export function Contact(props: ContactInterface) {
  const { canEdit, status } = props;
  const [messagesCount, setMessagesCount] = useState(0);
  const [messagesCountLoaded, setMessagesCountLoaded] = useState(false);
  const { t } = useTranslation();

  const handleSubmitForm = (data: any) => {
    const endpoint = `${paths_dict.contact}`;
    lookup(
      "POST",
      endpoint,
      (response, status) => {
        if (status === 201) {
          display_message(
            t("sent", { name: response.name }),
            "alert alert-success"
          );
        }
      },
      data,
      { "Content-Type": "application/json" }
    ).catch(() => {
      display_message(
        t(
          "Sorry it seems that our mail server is not responding. Please try again later!"
        ),
        "alert alert-danger"
      );
    });
    const display_message = (message: string, alert_type: string) => {
      const contact_display = document.getElementById("contact_display");
      if (contact_display) {
        contact_display.innerHTML = `<div class='${alert_type}'> <button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times; </button> <strong>${message}</strong></div>`;
      }
    };
  };

  const [formIsValid, setFormIsValid] = useState(true);
  const default_data = {
    name: "",
    email: "",
    subject: "",
    message: "",
  };

  useEffect(() => {
    const endpoint = `${paths_dict.contact_count}`;
    if (canEdit && messagesCountLoaded) {
      lookup(
        "GET",
        endpoint,
        (response, status) => {
          if (status === 200) {
            setMessagesCount(response["count"]);
            setMessagesCountLoaded(true);
          }
        },
        {},
        { "Content-Type": "application/json" }
      );
    }
  });

  return (
    <>
      <div className="container-fluid py-5" id="contact">
        <div
          className={`container mt-5 ${languageDirection}`}
          dir={languageDirection}
        >
          <div className="position-relative d-flex align-items-center justify-content-center">
            {/* {canEdit && (
              <Link to="/contact/">
                <ButtonComponent
                  class_name="btn btn-outline-primary m-3"
                  type="button"
                  text={
                    <>
                      <span className="badge badge-pill badge-secondary m-1">
                        {messagesCount !== 0 ? messagesCount : null}
                      </span>
                      <i className="far fa-comments"></i>
                    </>
                  }
                />
              </Link>
            )} */}
            <h1
              className="display-1 text-uppercase text-white"
              style={{ WebkitTextStroke: "1px #dee2e6" }}
            >
              {t("Contact")}
            </h1>
            <h1 className="position-absolute text-uppercase text-primary">
              {t("Contact Me")}
            </h1>
          </div>
          <div className="col-12 text-center mb-4">
            {canEdit && (
              <>
                <Link to="/contact/">
                  <ButtonComponent
                    class_name="btn btn-outline-primary m-2"
                    type="button"
                    text={
                      <>
                        <i className="fas fa-edit"></i>
                        <span className="ml-1">
                          {messagesCount !== 0
                            ? ConvertEnglishDigitToPersianOrArabic(
                                messagesCount.toString()
                              )
                            : null}
                        </span>
                      </>
                    }
                  />
                </Link>
                <HideOrShowSection
                  section="contact_public"
                  toggleStatus={status}
                />
              </>
            )}
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="contact-form text-center">
                <div id="contact_display"></div>
                <ContactFormComponent
                  formData={default_data}
                  setFormIsValid={setFormIsValid}
                  formIsValid={formIsValid}
                  handleProfileUpdated={handleSubmitForm}
                  clearForm={true}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
