import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { lookup } from "../lookup";
import { paths_dict } from "../lookup/url";
import { BlogInterface } from "./blog";
import { UpdateBlogComponent } from "./update";
import { NavbarComponent } from "../navbar";
import { languageDirection } from "../main";
import { AsideComponent } from "../components/aside";

export function BlogPageComponent() {
  const [blog, setBlog] = useState<BlogInterface>();
  const [blogLoaded, setBlogLoaded] = useState(false);
  const { id } = useParams<{ id: string }>();

  const handleBlogLookup = (response: BlogInterface, status: number) => {
    if (status === 200) {
      setBlog(response);
      setBlogLoaded(true);
    }
  };

  useEffect(() => {
    if (!blogLoaded) {
      const endpoint = `${paths_dict.blog}${id}/`;
      lookup(
        "GET",
        endpoint,
        handleBlogLookup,
        {},
        { "Content-Type": "application/json" }
      );
    }
  }, [blogLoaded, id]);

  const messageToShowUser = (message: string, alert_type: string) => {
    const blog_page_display = document.getElementById("blog_page_display");
    if (blog_page_display) {
      blog_page_display.innerHTML = `<div class='${alert_type}'> <button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times; </button> <strong>${message}</strong></div>`;
    }
  };
  return (
    <>
      <NavbarComponent home={false} />

      <div
        className={`mt-5 pt-5 col-lg-7 col-md-12 col-sm-12 mx-auto ${languageDirection}`}
        dir={`${languageDirection}`}
      >
        <div id="blog_page_display"></div>
        <UpdateBlogComponent
          blog={blog}
          setBlog={setBlog}
          messageToShowUser={messageToShowUser}
        />
      </div>

      <div className="col-lg-7 col-md-12 col-sm-12 mx-auto my-5 text-center">
        <aside>
          <AsideComponent asideType="blog" id={id} />
        </aside>
      </div>
    </>
  );
}
