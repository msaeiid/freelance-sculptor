import { SectionInterface } from "../components/homePage";
import { BlogList } from "./list";

export function BlogSection(props: SectionInterface) {
  const { status } = props;
  const messageToShowUser = (message: string, alert_type: string) => {
    const blog_home_display = document.getElementById("blog_home_display");
    if (blog_home_display) {
      blog_home_display.innerHTML = `<div class='${alert_type}'> <button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times; </button> <strong>${message}</strong></div>`;
    }
  };

  return (
    <div className="container-fluid pt-5" id="blog">
      <div className="container mt-5">
        <div id="blog_home_display"></div>
        <BlogList messageToShowUser={messageToShowUser} status={status} />
      </div>
    </div>
  );
}
