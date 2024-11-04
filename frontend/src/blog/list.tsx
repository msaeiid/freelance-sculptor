import { useEffect, useState } from "react";
import { BlogComponent, BlogInterface } from "./blog";
import { lookup } from "../lookup";
import { paths_dict } from "../lookup/url";
import { AddBlogComponent } from "./add";
import { useTranslation } from "react-i18next";
import { languageDirection, canEdit } from "../main";
import { HideOrShowSection } from "../components/HideOrShowSection";

export interface BlogListInterface {
  messageToShowUser: (message: string, alert_type: string) => void;
  status: boolean;
}

interface ServerResponse {
  count: number;
  next: URL;
  previous: URL;
  results: BlogInterface[];
}

export function BlogList(props: BlogListInterface) {
  const { messageToShowUser, status } = props;
  const { t } = useTranslation();
  const [blogs, setBlogs] = useState<BlogInterface[]>([]);
  const [blogsLoaded, setBlogsLoaded] = useState(false);
  const [isNext, setIsNext] = useState(false);
  const [path, setPath] = useState(`${paths_dict.blog}?page_size=3`);
  const [completeUrl, setCompleteUrl] = useState(false);

  const loadMore = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();

    // const url = path.toString().replace(/^https?:\/\/[^/]+\//, "");
    setCompleteUrl(true);

    setPath(path);
    setBlogsLoaded(false);
  };

  useEffect(() => {
    const handleBlogLookup = (response: ServerResponse, status: number) => {
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
        const final = [...blogs].concat(response.results);
        if (final.length !== blogs.length) {
          setBlogs(final);
        }
        setBlogsLoaded(true);
      }
    };

    if (!blogsLoaded) {
      lookup(
        "GET",
        path,
        handleBlogLookup,
        {},
        { "Content-Type": "application/json" },
        completeUrl
      );
    }
  }, [blogsLoaded, blogs, path, completeUrl, setCompleteUrl]);
  return (
    <>
      <div className="position-relative d-flex align-items-center justify-content-center">
        <h1
          className="display-1 text-uppercase text-white"
          style={{ WebkitTextStroke: "1px #dee2e6" }}
        >
          {t("Blog")}
        </h1>
        <h1 className="position-absolute text-uppercase text-primary">
          {t("My Blog")}
        </h1>
      </div>
      <div className={`row ${languageDirection}`} dir={`${languageDirection}`}>
        <div className="col-12 text-center">
          {canEdit && (
            <>
              <AddBlogComponent
                setBlogs={setBlogs}
                messageToShowUser={messageToShowUser}
                blogs={blogs}
              />
              <HideOrShowSection section="blog_public" toggleStatus={status} />
            </>
          )}
        </div>
        {blogs.map((blog, index) => (
          <BlogComponent {...blog} key={`${index}-${blog.id}`} />
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
    </>
  );
}
