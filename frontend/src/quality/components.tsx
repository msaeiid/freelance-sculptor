import { ButtonComponent } from "../components";
import { Link } from "react-router-dom";
import { EducationListComponent } from "./listEducation";
import { ExperienceListComponent } from "./listExperience";
import { useTranslation } from "react-i18next";
import { canEdit } from "../main";
import { HideOrShowSection } from "../components/HideOrShowSection";
import { SectionInterface } from "../components/homePage";

export function QualitySection(props: SectionInterface) {
  const { status } = props;
  const { t } = useTranslation();
  return (
    <div className="container-fluid py-5" id="qualification">
      <div className="container mt-5">
        <div className="position-relative d-flex align-items-center justify-content-center">
          <h1
            className="display-1 text-uppercase text-white"
            style={{ WebkitTextStroke: "1px #dee2e6" }}
          >
            {t("Quality")}
          </h1>
          <h1 className="position-absolute text-uppercase text-primary">
            {t("My Quality")}
          </h1>
        </div>
        <div className="col-12 text-center mb-4">
          {canEdit && (
            <>
              <Link to="/qualities">
                <ButtonComponent
                  class_name="btn btn-outline-primary"
                  type="button"
                  text={<i className="fas fa-edit"></i>}
                />
              </Link>
              <HideOrShowSection
                section="quality_public"
                toggleStatus={status}
              />
            </>
          )}
        </div>
        <div className="row align-items-center">
          <EducationListComponent />

          <ExperienceListComponent />
        </div>
      </div>
    </div>
  );
}
