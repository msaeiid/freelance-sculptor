import { useEffect, useState } from "react";
import { lookup } from "../lookup";
import { paths_dict } from "../lookup/url";
import { EducationInterface } from "./education";
import { ExperienceInterface } from "./experience";
import { EducationUpdateComponent } from "./updateEducation";
import { ExperienceUpdateComponent } from "./updateExperience";
import { AddExperience } from "./addExperience";
import { AddEducation } from "./addEducation";
import { NavbarComponent } from "../navbar";
import { useTranslation } from "react-i18next";
import { languageDirection } from "../main";

export function QualityPageComponent() {
  const [educations, setEducations] = useState<EducationInterface[]>([]);
  const [experiences, setExperiences] = useState<ExperienceInterface[]>([]);
  const [educationsLoaded, setEducationsLoaded] = useState(false);
  const [experiencesLoaded, setExperiencesLoaded] = useState(false);
  const { t } = useTranslation();

  const handleEducationLookup = (
    response: EducationInterface[],
    status: number
  ) => {
    if (status === 200) {
      setEducations(response);
      setEducationsLoaded(true);
    }
  };
  const handleExperienceLookup = (
    response: ExperienceInterface[],
    status: number
  ) => {
    if (status === 200) {
      setExperiences(response);
      setExperiencesLoaded(true);
    }
  };
  useEffect(() => {
    if (!experiencesLoaded) {
      lookup(
        "GET",
        paths_dict.experience,
        handleExperienceLookup,
        {},
        { "Content-Type": "application/json" }
      );
    }
    if (!educationsLoaded) {
      lookup(
        "GET",
        paths_dict.education,
        handleEducationLookup,
        {},
        { "Content-Type": "application/json" }
      );
    }
  }, [experiencesLoaded, educationsLoaded]);

  const messageToShowUser = (message: string, alert_type: string) => {
    const qualification_display = document.getElementById(
      "qualification_display"
    );
    if (qualification_display) {
      qualification_display.innerHTML = `<div class='${alert_type}'> <button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times; </button> <strong>${message}</strong></div>`;
    }
  };

  return (
    <>
      <NavbarComponent home={false} />
      <div
        className={`col-lg-7 col-md-10 col-sm-12 py-5 my-5 mx-auto ${languageDirection}`}
        dir={`${languageDirection}`}
      >
        <div className="container">
          <div id="qualification_display"></div>
          <div className="row">
            <div className="col-lg-6 col-sm-12 p-2 rounded">
              <div className="my-lg-5 ml-lg-5">
                <h2>{t("Education")}</h2>
                <AddEducation
                  setEducations={setEducations}
                  educations={educations}
                  messageToShowUser={messageToShowUser}
                />
              </div>
              <div className="pt-2 pl-lg-4 ml-lg-2">
                <EducationUpdateComponent
                  educations={educations}
                  setEducations={setEducations}
                  messageToShowUser={messageToShowUser}
                />
              </div>
            </div>
            <div className="col-lg-6 col-sm-12 p-2 rounded">
              <div className="my-lg-5 ml-lg-5">
                <h2>{t("Experience")}</h2>
                <AddExperience
                  setExperiences={setExperiences}
                  experiences={experiences}
                  messageToShowUser={messageToShowUser}
                />
              </div>
              <div className="pt-2 pl-lg-4 ml-lg-2">
                <ExperienceUpdateComponent
                  setExperiences={setExperiences}
                  experiences={experiences}
                  messageToShowUser={messageToShowUser}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
