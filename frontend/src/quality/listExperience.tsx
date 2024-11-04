import { useEffect, useState } from "react";
import { ExperienceInterface, ExperienceComponent } from "./experience";
import { lookup } from "../lookup";
import { paths_dict } from "../lookup/url";
import { useTranslation } from "react-i18next";
import { languageDirection } from "../main";

export function ExperienceListComponent() {
  const [experiences, setExperiences] = useState<ExperienceInterface[]>([]);
  const [experiencesLoaded, setExperiencesLoaded] = useState(false);
  const { t } = useTranslation();

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
  }, [experiencesLoaded]);
  return (
    <div className="col-lg-6">
      <h3 className={`mb-4 ${languageDirection}`} dir={`${languageDirection}`}>
        {t("My Experience")}
      </h3>
      <div
        className={`border-${
          languageDirection === "ltr" ? "left" : "right"
        } border-primary pt-2 px-4 mx-2 ${languageDirection}`}
        dir={`${languageDirection}`}
      >
        {experiences.map((experience: ExperienceInterface, index) => {
          return (
            <ExperienceComponent
              {...experience}
              key={`${index}-${experience.id}`}
            />
          );
        })}
      </div>
    </div>
  );
}
