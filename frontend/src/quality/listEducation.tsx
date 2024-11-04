import { useEffect, useState } from "react";
import { EducationComponent } from "./education";
import { EducationInterface } from "./education";
import { lookup } from "../lookup";
import { paths_dict } from "../lookup/url";
import { useTranslation } from "react-i18next";
import { languageDirection } from "../main";

export function EducationListComponent() {
  const [educations, setEducations] = useState<EducationInterface[]>([]);
  const [educationsLoaded, setEducationsLoaded] = useState(false);
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

  useEffect(() => {
    if (!educationsLoaded) {
      lookup(
        "GET",
        paths_dict.education,
        handleEducationLookup,
        {},
        { "Content-Type": "application/json" }
      );
    }
  }, [educationsLoaded]);
  return (
    <div className="col-lg-6">
      <h3 className={`mb-4 ${languageDirection}`} dir={`${languageDirection}`}>
        {t("My Education")}
      </h3>
      <div
        className={`border-${
          languageDirection === "ltr" ? "left" : "right"
        } border-primary pt-2 px-4 mx-2 ${languageDirection}`}
        dir={`${languageDirection}`}
      >
        {educations.map((education: EducationInterface, index) => {
          return (
            <EducationComponent
              {...education}
              key={`${index}-${education.id}`}
            />
          );
        })}
      </div>
    </div>
  );
}
