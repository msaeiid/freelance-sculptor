import { useState } from "react";
import { ModalComponent } from "../components";
import { EducationInterface } from "./education";
import { paths_dict } from "../lookup/url";
import { DeleteEducation } from "./deleteEducation";
import { EducationFormMaker } from "./formEducation";
import { useTranslation } from "react-i18next";
import { canEdit } from "../main";
import { lookup } from "../lookup";
import { ConvertEnglishDigitToPersianOrArabic } from "../lookup/fa";
import { getLocalizedDate } from "../lookup/localize";

interface EducationComponentInterface {
  educations: EducationInterface[];
  setEducations: (data: any) => void;
  messageToShowUser: (message: string, alert_type: string) => void;
}

export function EducationUpdateComponent(props: EducationComponentInterface) {
  const { educations, setEducations, messageToShowUser } = props;
  const { t } = useTranslation();
  const [selectedEducation, setSelectedEducation] =
    useState<EducationInterface>({
      id: 0,
      title: "",
      university_name: "",
      start_date: new Date(),
      finish_date: new Date(),
      until_now: false,
      description: "",
    });

  const CloseModal = () => {
    const modalCloseButton = document.getElementById("closeModal");
    modalCloseButton?.click();
  };

  const handleOnEducationFormSubmit = (data: any, isChanged: boolean) => {
    const endpoint = `${paths_dict.education}${data.id}/`;
    if (data["until_now"] === "") {
      data["until_now"] = true;
    } else {
      data["until_now"] = false;
    }
    if (isChanged) {
      lookup(
        "PUT",
        endpoint,
        (response, status) => {
          if (status === 200) {
            CloseModal();
            const updatedEducations = educations.map((education) => {
              if (education.id === response.id) {
                return response;
              }
              return education;
            });
            setEducations(updatedEducations);
            messageToShowUser(
              t("objectUpdated", { title: response.title }),
              "alert alert-success"
            );
          }
        },
        data,
        { "Content-Type": "application/json" }
      ).catch((error) => {
        messageToShowUser(
          t(
            `Sorry it seems that server is not responding. Please try again later!\n${error}`
          ),
          "alert alert-danger"
        );
      });
    }
    CloseModal();
  };

  const handleOnEducationButtonClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    education: EducationInterface
  ) => {
    event.preventDefault();
    setSelectedEducation(education);
  };

  const handleOnModalClosed = (status: boolean) => {
    if (!status) {
      setSelectedEducation({
        id: 0,
        title: "",
        university_name: "",
        start_date: new Date(),
        finish_date: new Date(),
        until_now: false,
        description: "",
      });
    }
  };
  const [formIsValid, setFormIsValid] = useState(true);

  return (
    <>
      {educations.map((education: EducationInterface, index: number) => {
        return (
          <div
            className="rounded pt-2 pl-4 ml-2 mb-5"
            key={`${education.id}-${index}`}
          >
            <div className="position-relative mb-4">
              <i
                className="text-primary position-absolute text-primary position-absolute"
                style={{ top: "2px", left: "-32px" }}
              ></i>
              <h5 className="font-weight-bold mb-1">
                {ConvertEnglishDigitToPersianOrArabic(education.title)}
              </h5>
              <p className="mb-2">
                <strong>
                  {ConvertEnglishDigitToPersianOrArabic(
                    education.university_name
                  )}
                </strong>
              </p>
              <p>
                <small>
                  {ConvertEnglishDigitToPersianOrArabic(
                    getLocalizedDate(education.start_date)
                  )}{" "}
                  -{" "}
                  {education.until_now
                    ? t("Now")
                    : ConvertEnglishDigitToPersianOrArabic(
                        getLocalizedDate(education.finish_date)
                      )}
                </small>
              </p>
              <p>
                {ConvertEnglishDigitToPersianOrArabic(education.description)}
              </p>
              {canEdit && (
                <>
                  <ModalComponent
                    large={true}
                    buttonClassName={"btn btn-sm btn-outline-secondary"}
                    buttonFontAwesome={"fas fa-edit"}
                    onButtonClick={(event) => {
                      handleOnEducationButtonClick(event, education);
                    }}
                    onModalClose={handleOnModalClosed}
                  >
                    <EducationFormMaker
                      education={selectedEducation}
                      setFormIsValid={setFormIsValid}
                      formIsValid={formIsValid}
                      handleProfileUpdated={handleOnEducationFormSubmit}
                    />
                  </ModalComponent>
                  <DeleteEducation
                    education={education}
                    educations={educations}
                    setEducations={setEducations}
                    messageToShowUser={messageToShowUser}
                  />
                </>
              )}
            </div>
          </div>
        );
      })}
    </>
  );
}
