import { GalleryList } from "./listGallery";
import { Link } from "react-router-dom";
import { ButtonComponent } from "../components";
import { GalleryCategoryList } from "./listCategory";
import { useState } from "react";
import { CategoryInterface } from "./category";
import { useTranslation } from "react-i18next";
import { canEdit } from "../main";
import { SectionInterface } from "../components/homePage";
import { HideOrShowSection } from "../components/HideOrShowSection";

export function PortfolioSection(props: SectionInterface) {
  const { status } = props;
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState("All");

  const handleCategoryClick = (category: CategoryInterface) => {
    setActiveCategory(category.title);
  };

  return (
    <div className="container-fluid pt-5 pb-3" id="portfolio">
      <div className="container mt-5">
        <div className="position-relative d-flex align-items-center justify-content-center">
          <h1
            className="display-1 text-uppercase text-white"
            style={{ WebkitTextStroke: "1px #dee2e6" }}
          >
            {t("Portfolio")}
          </h1>
          <h1 className="position-absolute text-uppercase text-primary">
            {t("My Portfolio")}
          </h1>
        </div>
        <div className="col-12 text-center mb-4">
          {canEdit && (
            <>
              <Link to="/portfolio">
                <ButtonComponent
                  class_name="btn btn-outline-primary"
                  type="button"
                  text={<i className="fas fa-edit"></i>}
                />
              </Link>
              <HideOrShowSection
                section="portfolio_public"
                toggleStatus={status}
              />
            </>
          )}
        </div>
        <GalleryCategoryList
          activeCategory={activeCategory}
          handleCategoryClick={handleCategoryClick}
        />
        <GalleryList activeCategory={activeCategory} />
      </div>
    </div>
  );
}
