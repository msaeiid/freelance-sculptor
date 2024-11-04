import { useEffect, useState, useRef } from "react";
import { SkillListComponent } from "./list";
import { Link } from "react-router-dom";
import { ButtonComponent } from "../components";
import { useTranslation } from "react-i18next";
import { canEdit, languageDirection } from "../main";
import { HideOrShowSection } from "../components/HideOrShowSection";
import { SectionInterface } from "../components/homePage";

export function SkillSection(props: SectionInterface) {
  const { status } = props;
  const { t } = useTranslation();
  const [scrolledOn, setScrolledOn] = useState(false);
  const skillSectionRef = useRef<HTMLDivElement>(null);
  const handleScrollOn = (event: React.UIEvent<HTMLDivElement, UIEvent>) => {
    event.preventDefault();
  };
  useEffect(() => {
    const skillObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setScrolledOn(true);
          } else {
            setScrolledOn(false);
          }
        });
      },
      { threshold: 0.5 } // Customize the threshold as needed (0.5 means at least 50% of the section should be visible)
    );

    if (skillSectionRef.current) {
      skillObserver.observe(skillSectionRef.current);
    }

    return () => {
      if (skillSectionRef.current) {
        skillObserver.unobserve(skillSectionRef.current);
      }
    };
  }, []);

  return (
    <div
      className="container-fluid py-5"
      id="skill"
      ref={skillSectionRef}
      onScroll={handleScrollOn}
    >
      <div className="container mt-5">
        <div className="position-relative d-flex align-items-center justify-content-center">
          <h1
            className="display-1 text-uppercase text-white"
            style={{ WebkitTextStroke: "1px #dee2e6" }}
          >
            {t("Skill")}
          </h1>
          <h1 className="position-absolute text-uppercase text-primary">
            {t("My Skill")}
          </h1>
        </div>
        <div className="col-12 text-center mb-4">
          {canEdit && (
            <>
              <Link to="/skills">
                <ButtonComponent
                  class_name="btn btn-outline-primary"
                  type="button"
                  text={<i className="fas fa-edit"></i>}
                />
              </Link>
              <HideOrShowSection section="skill_public" toggleStatus={status} />
            </>
          )}
        </div>
        <div
          className={`row align-items-center ${languageDirection}`}
          dir={`${languageDirection}`}
        >
          <SkillListComponent scrolledOn={scrolledOn} />
        </div>
      </div>
    </div>
  );
}
