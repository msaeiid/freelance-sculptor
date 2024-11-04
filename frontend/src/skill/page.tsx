import { useEffect, useState } from "react";
import { SkillInterface } from "./skill";
import { lookup } from "../lookup";
import { AddSkillComponent } from "./add";
import { UpdateSkillComponent } from "./update";
import { NavbarComponent } from "../navbar";
import { useTranslation } from "react-i18next";
import { languageDirection } from "../main";
import { paths_dict } from "../lookup/url";

export function SkillPageComponent() {
  const { t } = useTranslation();
  const [skills, setSkills] = useState<SkillInterface[]>([]);
  const [skillsLoaded, setSkillsLoaded] = useState(false);

  const handleSkillLookup = (response: SkillInterface[], status: number) => {
    if (status === 200) {
      setSkills(response);
      setSkillsLoaded(true);
    }
  };

  useEffect(() => {
    if (!skillsLoaded) {
      lookup(
        "GET",
        paths_dict.skill,
        handleSkillLookup,
        {},
        { "Content-Type": "application/json" }
      );
    }
  }, [skillsLoaded]);

  const messageToShowUser = (message: string, alert_type: string) => {
    const skill_display = document.getElementById("skill_display");
    if (skill_display) {
      skill_display.innerHTML = `<div class='${alert_type}'> <button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times; </button> <strong>${message}</strong></div>`;
    }
  };
  return (
    <>
      <NavbarComponent home={false} />
      <div
        className={`col-lg-7 col-md-10 col-sm-12 py-5 my-5 mx-auto ${languageDirection}`}
        dir={`${languageDirection}`}
      >
        <div id="skill_display mt-2"></div>
        <div className="col-12 mx-lg-5 px-lg-5 px-lg-5 pb-5 rounded">
          <div className="mb-1 mx-lg-5 my-5">
            <h2 className="mb-3">{t("Skill")}</h2>
            <AddSkillComponent
              setSkills={setSkills}
              messageToShowUser={messageToShowUser}
              skills={skills}
            />
          </div>
          <div className="pt-2 px-lg-4 mx-lg-2">
            <UpdateSkillComponent
              skills={skills}
              setSkills={setSkills}
              messageToShowUser={messageToShowUser}
            />
          </div>
        </div>
      </div>
    </>
  );
}
