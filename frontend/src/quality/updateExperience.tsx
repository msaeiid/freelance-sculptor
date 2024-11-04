import { useState } from "react";
import { ModalComponent } from "../components";
import { ExperienceInterface } from "./experience";
import { ExperienceFormMaker } from "./formExperience";
import { lookup } from "../lookup";
import { paths_dict } from "../lookup/url";
import { DeleteExperience } from "./deleteExperience";
import { useTranslation } from "react-i18next";
import { canEdit } from "../main";
import { ConvertEnglishDigitToPersianOrArabic } from "../lookup/fa";
import { getLocalizedDate } from "../lookup/localize";

interface ExperienceComponentInterface {
  experiences: ExperienceInterface[];
  setExperiences: (data: any) => void;
  messageToShowUser: (message: string, alert_type: string) => void;
}

export function ExperienceUpdateComponent(props: ExperienceComponentInterface) {
  const { experiences, setExperiences, messageToShowUser } = props;
  const { t } = useTranslation();
  const [selectedExperience, setSelectedExperience] =
    useState<ExperienceInterface>({
      id: 0,
      title: "",
      company_name: "",
      start_date: new Date(),
      finish_date: new Date(),
      until_now: false,
      description: "",
    });

  const CloseModal = () => {
    const modalCloseButton = document.getElementById("closeModal");
    modalCloseButton?.click();
  };

  const handleOnExperienceFormSubmit = (data: any, isChanged: boolean) => {
    const endpoint = `${paths_dict.experience}${data.id}/`;
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
            const updatedExperiences = experiences.map((experience) => {
              if (experience.id === response.id) {
                return response;
              }
              return experience;
            });
            setExperiences(updatedExperiences);
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

  const handleOnExperienceButtonClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    experience: ExperienceInterface
  ) => {
    event.preventDefault();
    setSelectedExperience(experience);
  };

  const handleOnModalClosed = (status: boolean) => {
    if (!status) {
      setSelectedExperience({
        id: 0,
        title: "",
        company_name: "",
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
      {experiences.map((experience: ExperienceInterface, index: number) => (
        <div
          className="rounded pt-2 pl-4 ml-2 mb-5"
          key={`${experience.id}-${index}`}
        >
          <div className="position-relative mb-4">
            <i
              className="text-primary position-absolute text-primary position-absolute"
              style={{ top: "2px", left: "-32px" }}
            ></i>
            <h5 className="font-weight-bold mb-1">
              {ConvertEnglishDigitToPersianOrArabic(experience.title)}
            </h5>
            <p className="mb-2">
              <strong>
                {ConvertEnglishDigitToPersianOrArabic(experience.company_name)}
              </strong>
            </p>
            <p>
              <small>
                {ConvertEnglishDigitToPersianOrArabic(
                  getLocalizedDate(experience.start_date)
                )}{" "}
                -{" "}
                {experience.until_now
                  ? t("Now")
                  : ConvertEnglishDigitToPersianOrArabic(
                      getLocalizedDate(experience.finish_date)
                    )}
              </small>
            </p>
            <p>
              {ConvertEnglishDigitToPersianOrArabic(experience.description)}
            </p>
            {canEdit && (
              <>
                <ModalComponent
                  large={true}
                  buttonClassName={"btn btn-sm btn-outline-secondary"}
                  buttonFontAwesome={"fas fa-edit"}
                  onButtonClick={(event) =>
                    handleOnExperienceButtonClick(event, experience)
                  }
                  onModalClose={handleOnModalClosed}
                >
                  <ExperienceFormMaker
                    experience={selectedExperience}
                    setFormIsValid={setFormIsValid}
                    formIsValid={formIsValid}
                    handleProfileUpdated={handleOnExperienceFormSubmit}
                  />
                </ModalComponent>
                <DeleteExperience
                  experience={experience}
                  experiences={experiences}
                  setExperiences={setExperiences}
                  messageToShowUser={messageToShowUser}
                />
              </>
            )}
          </div>
        </div>
      ))}
    </>
  );
}
