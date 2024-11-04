import { Link } from "react-router-dom";
import { ButtonComponent } from "../components";
import { TestimonialList } from "./list";
import { useTranslation } from "react-i18next";
import { canEdit } from "../main";
import { HideOrShowSection } from "../components/HideOrShowSection";
import { SectionInterface } from "../components/homePage";

export function TestimonialSection(props: SectionInterface) {
  const { status } = props;
  const { t } = useTranslation();

  return (
    <div className="container-fluid py-5" id="testimonial">
      <div className="position-relative d-flex align-items-center justify-content-center mt-5">
        <h1
          className="display-1 text-uppercase text-white"
          style={{ WebkitTextStroke: "1px #dee2e6" }}
        >
          {t("Review")}
        </h1>
        <h1 className="position-absolute text-uppercase text-primary">
          {t("Clients Say")}
        </h1>
      </div>
      <div className="col-12 text-center mb-4">
        {canEdit && (
          <>
            <Link to="/reviews">
              <ButtonComponent
                class_name="btn btn-outline-primary"
                type="button"
                text={<i className="fas fa-edit"></i>}
              />
            </Link>
            <HideOrShowSection section="review_public" toggleStatus={status} />
          </>
        )}
      </div>
      <TestimonialList />
    </div>
  );
}
