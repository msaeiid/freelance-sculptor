import { useEffect, useState } from "react";
import { lookup } from "../lookup";
import { paths_dict } from "../lookup/url";
import { BlogInterface } from "../blog/blog";
import { ServiceInterface } from "../service/service";
import { ConvertEnglishDigitToPersianOrArabic } from "../lookup/fa";
import { ServerResponse } from "../portfolio/listGallery";
import { t } from "i18next";

interface AsideComponentInterface {
  asideType: "blog" | "service";
  id?: string;
}

function isBlog(item: BlogInterface | ServiceInterface): item is BlogInterface {
  return (item as BlogInterface).images !== undefined;
}

export function AsideComponent(props: AsideComponentInterface) {
  const { asideType, id } = props;
  const [blogList, setBlogList] = useState<BlogInterface[]>([]);
  const [serviceList, setServiceList] = useState<ServiceInterface[]>([]);
  const [isNext, setIsNext] = useState(false);
  const [ItemsLoaded, setItemsLoaded] = useState(false);
  const [path, setPath] = useState(
    (asideType === "blog" ? paths_dict.blog : paths_dict.service) +
      `?exclude=${id}&page_size=3`
  );
  const [completeUrl, setCompleteUrl] = useState(false);

  const handleBlogsLookup = (response: ServerResponse, status: number) => {
    if (response.next) {
      setIsNext(true);
      setPath(response.next.toString());
      setCompleteUrl(true);
    } else {
      setIsNext(false);
      setPath("");
      setCompleteUrl(false);
    }
    if (status === 200) {
      if (asideType === "blog") {
        const finalBlogs = [
          ...blogList,
          ...(response.results as BlogInterface[]),
        ];
        setBlogList(finalBlogs);
      } else {
        const finalServices = [
          ...serviceList,
          ...(response.results as ServiceInterface[]),
        ];
        setServiceList(finalServices);
      }
      setItemsLoaded(true);
    }
  };

  useEffect(() => {
    if (!ItemsLoaded) {
      lookup(
        "GET",
        path,
        handleBlogsLookup,
        {},
        { "Content-Type": "application/json" },
        completeUrl
      );
    }
  }, [blogList, serviceList, asideType, ItemsLoaded, id, path, completeUrl]);

  const truncateTitle = (title: string, maxLength: number = 20) => {
    return title.length > maxLength
      ? title.substring(0, maxLength) + "..."
      : title;
  };

  const loadMore = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setCompleteUrl(true);
    setPath(path);
    setItemsLoaded(false);
  };

  const listToDisplay = asideType === "blog" ? blogList : serviceList;

  return (
    <div className="background-div">
      <h1 className="text-primary">Other</h1>
      <div className="row">
        {listToDisplay.map((item, index) => (
          <div
            key={index}
            className="col-lg-4 col-md-6 col-sm-12 text-center my-3 px-2 pb-3 itemShow rounded"
          >
            <a
              href={
                (asideType === "blog" ? "/blog/" : "/service/") + `${item.id}`
              }
              className="card-link"
            >
              <div className="card border-0 bg-transparent">
                <div className="card-body p-2">
                  {isBlog(item) && (
                    <img
                      src={item && item.images ? item.images.toString() : "#"}
                      alt={item ? item.title : "#"}
                      className="img-fluid rounded"
                    />
                  )}
                  {!isBlog(item) && (
                    <div className="d-flex align-items-center justify-content-center mb-4">
                      <i className={item.icon}></i>
                      <h4 className="font-weight-bold mx-2">
                        {truncateTitle(
                          ConvertEnglishDigitToPersianOrArabic(item.title),
                          10
                        )}
                      </h4>
                    </div>
                  )}
                </div>
                {isBlog(item) && (
                  <p className="my-0 mt-2">
                    {truncateTitle(
                      ConvertEnglishDigitToPersianOrArabic(item.title)
                    )}
                  </p>
                )}
                {!isBlog(item) && (
                  <p className="my-0 mt-2">
                    {truncateTitle(
                      ConvertEnglishDigitToPersianOrArabic(
                        item.short_description
                      )
                    )}
                  </p>
                )}
              </div>
            </a>
          </div>
        ))}

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
  );
}
