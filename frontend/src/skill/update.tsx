import { useState } from "react";
import { SkillInterface } from "./skill";
import { lookup } from "../lookup/components";
import { ModalComponent } from "../components";
import { SkillFormMaker } from "./form";
import { DeleteSkill } from "./delete";
import { useTranslation } from "react-i18next";
import { canEdit } from "../main";
import { paths_dict } from "../lookup/url";
import { ConvertEnglishDigitToPersianOrArabic } from "../lookup/fa";

interface UpdateSkillComponentInterface {
  skills: SkillInterface[];
  setSkills: (data: any) => void;
  messageToShowUser: (message: string, alert_type: string) => void;
}
interface SkillAddInterface {
  id: number;
  title: string;
  percentage: number;
  color: string;
  scrolledOn: boolean;
}

export function UpdateSkillComponent(props: UpdateSkillComponentInterface) {
  const { skills, setSkills, messageToShowUser } = props;
  const { t } = useTranslation();
  const [selectedSkill, setSelectedSkill] = useState<SkillAddInterface>({
    id: 0,
    title: "",
    percentage: 0,
    color: "#000000",
    scrolledOn: false,
  });

  const CloseModal = () => {
    const modalCloseButton = document.getElementById("closeModal");
    modalCloseButton?.click();
  };

  const handleOnSkillFormSubmit = (data: any, isChanged: boolean) => {
    const endpoint = `${paths_dict.skill}${data.id}/`;
    if (isChanged) {
      lookup(
        "PUT",
        endpoint,
        (response, status) => {
          if (status === 200) {
            const updatedSkills = skills.map((skill) => {
              if (skill.id === response.id) {
                return response;
              }
              return skill;
            });
            setSkills(updatedSkills);
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

  const handleOnSkillButtonClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    education: SkillInterface
  ) => {
    event.preventDefault();
    setSelectedSkill(education);
  };

  const handleOnModalClosed = (status: boolean) => {
    if (!status) {
      setSelectedSkill({
        id: 0,
        title: "",
        percentage: 0,
        color: "#000000",
        scrolledOn: false,
      });
    }
  };
  const [formIsValid, setFormIsValid] = useState(true);

  return (
    <div className="row align-items-center">
      {skills.map((skill: SkillInterface, index: number) => (
        <div className="col-md-6 mb-5" key={`${index}-${skill.id}`}>
          <div className="skill mb-4">
            <div className="d-flex justify-content-between">
              <h6 className="font-weight-bold">
                {ConvertEnglishDigitToPersianOrArabic(skill.title)}
              </h6>
              <h6 className="font-weight-bold">
                {ConvertEnglishDigitToPersianOrArabic(
                  skill.percentage.toString()
                )}
                %
              </h6>
            </div>
            <div className="progress">
              <div
                className="progress-bar"
                role="progressbar"
                style={
                  skill.scrolledOn
                    ? {
                        width: `${skill.percentage}%`,
                        backgroundColor: skill.color,
                      }
                    : {
                        width: `${skill.percentage}%`,
                        backgroundColor: skill.color,
                      }
                }
                aria-valuenow={skill.scrolledOn ? skill.percentage : 0}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="fuels"
              ></div>
            </div>
          </div>
          {canEdit && (
            <>
              <ModalComponent
                buttonClassName={"btn btn-sm btn-outline-secondary"}
                buttonFontAwesome={"fas fa-edit"}
                onButtonClick={(event) => {
                  handleOnSkillButtonClick(event, skill);
                }}
                onModalClose={handleOnModalClosed}
              >
                <SkillFormMaker
                  skill={selectedSkill}
                  setFormIsValid={setFormIsValid}
                  formIsValid={formIsValid}
                  handleProfileUpdated={handleOnSkillFormSubmit}
                />
              </ModalComponent>
              <DeleteSkill
                skill={skill}
                skills={skills}
                setSkills={setSkills}
                messageToShowUser={messageToShowUser}
              />
            </>
          )}
        </div>
      ))}
    </div>
  );
}
