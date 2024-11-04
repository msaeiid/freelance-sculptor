import { useEffect, useState } from "react";
import { lookup } from "../lookup";
import { paths_dict } from "../lookup/url";
import { GalleryInterface } from "./gallery";
import { AddPortfolioComponent } from "./addGallery";
import { UpdatePortfolioComponent } from "./updateGallery";
import { CategoryInterface } from "./category";
import { NavbarComponent } from "../navbar";
import { AddCategoryComponent } from "./addCategory";
import { ServerResponse } from "./listGallery";
import { GalleryFilterComponent } from "./filter";
import { useTranslation } from "react-i18next";
import { languageDirection } from "../main";

export function PortfolioPageComponent() {
  const { t } = useTranslation();
  const [galleries, setGalleries] = useState<GalleryInterface[]>([]);
  const [galleriesLoaded, setGalleriesLoaded] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [categoryLoaded, setCategoryLoaded] = useState(false);
  const [nextPath, setNextPath] = useState("");
  const [expandCategory, setExpandCategory] = useState(false);
  const [loadMoreTouch, setLoadMoreTouch] = useState(false);
  const [isNext, setIsNext] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [currentPath, setCurrentPath] = useState(
    `${paths_dict.gallery}?page_size=6&category=${activeCategory}`
  );
  const [completeUrl, setCompleteUrl] = useState(false);

  const loadMore = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setCurrentPath(nextPath);
    setLoadMoreTouch(true);
  };

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
    const handleGalleryLookup = (response: ServerResponse, status: number) => {
      if (response.next) {
        setIsNext(true);
        // setNextPath(
        //   response.next.toString().replace(/^https?:\/\/[^/]+\//, "")
        // );
        setNextPath(response.next.toString());
        setCompleteUrl(true);
      } else {
        setIsNext(false);
        setNextPath("");
        setCompleteUrl(false);
      }
      if (status === 200) {
        let final = [];
        if (loadMoreTouch) {
          final = [...galleries].concat(response.results);
          setLoadMoreTouch(false);
        } else {
          final = [...response.results];
        }
        setGalleries(final);
        // setGalleryTemp(response);
        setGalleriesLoaded(true);
      }
    };
    if (!categoryLoaded) {
      lookup(
        "GET",
        paths_dict.category,
        handleCategoryLookup,
        {},
        { "Content-Type": "application/json" },
        completeUrl
      );
    }
    if (!galleriesLoaded || loadMoreTouch || refresh) {
      lookup(
        "GET",
        currentPath,
        handleGalleryLookup,
        {},
        { "Content-Type": "application/json" },
        completeUrl
      );
    }
    setRefresh(false);
  }, [
    setCategoryLoaded,
    categoryLoaded,
    setGalleriesLoaded,
    galleriesLoaded,
    categories,
    currentPath,
    loadMoreTouch,
    galleries,
    refresh,
    setCompleteUrl,
    completeUrl,
  ]);

  const handleCategoryClick = (category: CategoryInterface) => {
    setActiveCategory(category.title);
  };

  const messageToShowUser = (message: string, alert_type: string) => {
    const portfolio_display = document.getElementById("portfolio_display");
    if (portfolio_display) {
      portfolio_display.innerHTML = `<div class='${alert_type}'> <button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times; </button> <strong>${message}</strong></div>`;
    }
  };

  return (
    <>
      <NavbarComponent home={false} />
      <div
        className={`col-lg-7 col-md-10 col-sm-12 py-5 my-5 mx-auto ${languageDirection}`}
        dir={`${languageDirection}`}
      >
        <div id="portfolio_display"></div>
        <div className="row portfolio-container">
          <div className="col-12 mr-lg-5 pb-5 pl-lg-5 pr-lg-5 rounded">
            <div className="mb-1 ml-lg-5">
              <h2 className="mb-3 mt-5">{t("Category")}</h2>
              <AddCategoryComponent
                categories={categories}
                setCategories={setCategories}
                messageToShowUser={messageToShowUser}
              />
              {/* update button */}
              <button
                type="button"
                className="mr-lg-3 ml-lg-3 btn btn-sm btn-outline-secondary"
                data-toggle="modal"
                data-target="#exampleModalLong"
                onClick={(event) => {
                  event.preventDefault();
                  setExpandCategory(!expandCategory);
                }}
              >
                {/* update button */}
                <i className="fas fa-edit"></i>
              </button>
              <div className="col-12 text-center mb-2">
                <ul className="list-inline mb-4" id="portfolio-filters">
                  <GalleryFilterComponent
                    categoryLoaded={categoryLoaded}
                    categories={categories}
                    activeCategory={activeCategory}
                    handleCategoryClick={handleCategoryClick}
                    expandCategory={expandCategory}
                    setCategories={setCategories}
                    messageToShowUser={messageToShowUser}
                    setRefresh={setRefresh}
                  />
                </ul>
              </div>
            </div>
            <div className="mb-1 ml-lg-5">
              <h2 className="mb-3">{t("Portfolio")}</h2>
              <AddPortfolioComponent
                categories={categories}
                setGalleries={setGalleries}
                galleries={galleries}
                messageToShowUser={messageToShowUser}
              />
            </div>
            <div className="pt-2 px-1 mx-1">
              <UpdatePortfolioComponent
                activeCategory={activeCategory}
                galleries={galleries}
                setGalleries={setGalleries}
                categories={categories}
                messageToShowUser={messageToShowUser}
              />
            </div>
          </div>
          {isNext && (
            <div className="col-12 text-center my-5">
              <button
                className="btn btn-outline-primary btn-lg"
                onClick={loadMore}
              >
                {t("More")}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
