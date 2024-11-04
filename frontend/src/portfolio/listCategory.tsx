import { useEffect, useState } from "react";
import { CategoryInterface } from "./category";
import { lookup } from "../lookup";
import { paths_dict } from "../lookup/url";
import { GalleryFilterComponent } from "./filter";
import { useTranslation } from "react-i18next";
import { languageDirection } from "../main";

interface GalleryCategoryListInterface {
  activeCategory: string;
  handleCategoryClick: (category: CategoryInterface) => void;
}

export function GalleryCategoryList(props: GalleryCategoryListInterface) {
  const { activeCategory, handleCategoryClick } = props;
  const { t } = useTranslation();
  const [categoryLoaded, setCategoryLoaded] = useState(false);
  const [categories, setCategories] = useState([
    {
      id: 0,
      title: t("All"),
    },
  ]);

  useEffect(() => {
    const handleCategoryLookup = (
      response: CategoryInterface[],
      status: number
    ) => {
      if (status === 200) {
        setCategories([...categories, ...response]);
        setCategoryLoaded(true);
      }
    };
    if (!categoryLoaded) {
      lookup(
        "GET",
        paths_dict.category,
        handleCategoryLookup,
        {},
        { "Content-Type": "application/json" }
      );
    }
  }, [setCategoryLoaded, categoryLoaded, categories]);

  return (
    <div className="row">
      <div
        className={`col-12 text-center mb-2 ${languageDirection}`}
        dir={`${languageDirection}`}
      >
        <ul className="list-inline mb-4" id="portfolio-filters">
          <GalleryFilterComponent
            categoryLoaded={categoryLoaded}
            categories={categories}
            activeCategory={activeCategory}
            handleCategoryClick={handleCategoryClick}
            setCategories={setCategories}
          />
        </ul>
      </div>
    </div>
  );
}
