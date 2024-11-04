import { useEffect, useState } from "react";
import { GalleryComponent, GalleryInterface } from "./gallery";
import { lookup } from "../lookup";
import { paths_dict } from "../lookup/url";
import { useTranslation } from "react-i18next";
import { languageDirection } from "../main";
import { ConvertEnglishDigitToPersianOrArabic } from "../lookup/fa";

interface GalleryListInterface {
  activeCategory: string;
}
export interface ServerResponse {
  count: number;
  next: URL;
  previous: URL;
  results: [];
}
export function GalleryList(props: GalleryListInterface) {
  const { activeCategory } = props;
  const { t } = useTranslation();
  const [galleriesLoaded, setGalleriesLoaded] = useState(false);
  const [galleries, setGalleries] = useState<GalleryInterface[]>([]);
  const [isNext, setIsNext] = useState(false);
  const [nextPath, setNextPath] = useState("");
  const [loadMoreTouch, setLoadMoreTouch] = useState(false);
  const [categoryTemp, setCategoryTemp] = useState(activeCategory);
  const [currentPath, setCurrentPath] = useState(
    `${paths_dict.gallery}?page_size=6&category=${activeCategory}`
  );
  const [completeUrl, setCompleteUrl] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [clickedImageIndex, setClickedImageIndex] = useState<number>(0);

  const loadMore = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setCurrentPath(nextPath);
    setLoadMoreTouch(true);
  };

  useEffect(() => {
    const handleGalleryLookup = (response: ServerResponse, status: number) => {
      if (response.next) {
        setIsNext(true);
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
        setGalleriesLoaded(true);
      }
    };

    if (!galleriesLoaded || loadMoreTouch) {
      lookup(
        "GET",
        currentPath,
        handleGalleryLookup,
        {},
        { "Content-Type": "application/json" },
        completeUrl
      );
    }

    if (categoryTemp !== activeCategory) {
      setCategoryTemp(activeCategory);
      setCurrentPath(
        `${paths_dict.gallery}?page_size=6&category=${activeCategory}`
      );
      setGalleriesLoaded(false);
    }
  }, [
    setGalleriesLoaded,
    galleriesLoaded,
    galleries,
    currentPath,
    loadMoreTouch,
    activeCategory,
    categoryTemp,
    setCompleteUrl,
    completeUrl,
  ]);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handlePreviousImage = () => {
    setClickedImageIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : galleries.length - 1
    );
  };

  const handleNextImage = () => {
    setClickedImageIndex((prevIndex) => {
      if (prevIndex < galleries.length - 1) {
        return prevIndex + 1;
      } else if (isNext && prevIndex >= galleries.length - 1) {
        setCurrentPath(nextPath);
        setLoadMoreTouch(true);
        return prevIndex + 1;
      } else {
        return 0; // Reset the index in other cases
      }
    });
  };

  return (
    <>
      <div
        className={`row portfolio-container ${languageDirection}`}
        dir={`${languageDirection}`}
      >
        {galleries.map((gallery, index) => {
          return (
            <GalleryComponent
              key={`${index}-${gallery.id}`}
              gallery={gallery}
              setShowModal={() => {
                setShowModal(true);
                setClickedImageIndex(index);
              }}
            />
          );
        })}
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

      {/* Modal */}
      {showModal && galleries[clickedImageIndex] && (
        <div
          className="modal fade show fullscreen-modal"
          style={{ display: "block", zIndex: 1050 }}
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-xl" role="document">
            <div className="modal-content bg-transparent border-0 text-center">
              <div className="modal-body p-0">
                <img
                  className="img-fluid my-2"
                  src={`${galleries[clickedImageIndex].image}`}
                  alt={ConvertEnglishDigitToPersianOrArabic(
                    galleries[clickedImageIndex].title
                  )}
                  style={{ maxHeight: "calc(100vh - 100px)" }}
                />
                <div>
                  <button
                    className="btn btn-outline-primary py-1 px-2"
                    onClick={handlePreviousImage}
                  >
                    <i className="fa-solid fa-circle-chevron-left"></i>
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-primary py-1 px-2 mx-2"
                    data-dismiss="modal"
                    onClick={handleCloseModal}
                  >
                    <span>
                      <i className="fa-solid fa-circle-xmark"></i>
                    </span>
                  </button>
                  <button
                    className="btn btn-outline-primary py-1 px-2"
                    onClick={handleNextImage}
                  >
                    <i className="fa-solid fa-circle-chevron-right"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal backdrop */}
      {showModal && (
        <div
          className="modal-backdrop fade show"
          style={{ zIndex: 1040 }}
        ></div>
      )}
    </>
  );
}
