import { lookup } from "../lookup/components";
import { ModalComponent } from "../components";
import { BlogInterface } from "./blog";
import { DeleteBlog } from "./delete";
import { BlogFormMaker } from "./form";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { canEdit } from "../main";
import { paths_dict } from "../lookup/url";
import { ConvertEnglishDigitToPersianOrArabic } from "../lookup/fa";

interface UpdateBlogComponentInterface {
  blog?: BlogInterface;

  setBlog: (data: any) => void;
  messageToShowUser: (message: string, alert_type: string) => void;
}

export function UpdateBlogComponent(props: UpdateBlogComponentInterface) {
  const { blog, setBlog, messageToShowUser } = props;
  const { t } = useTranslation();
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageLoaded(true);
  };

  const CloseModal = () => {
    const modalCloseButton = document.getElementById("closeModal");
    modalCloseButton?.click();
  };

  const handleOnBlogFormSubmit = (
    data: any,
    isChanged: boolean,
    bodyChanged: boolean
  ) => {
    const endpoint = `${paths_dict.blog}${data.id}/`;
    if (data.images.name === "") {
      delete data.images;
    }
    if (isChanged || bodyChanged) {
      lookup(
        "PUT",
        endpoint,
        (response, status) => {
          if (status === 200) {
            setBlog(response);
            messageToShowUser(
              t("objectUpdated", { title: response.title }),
              "alert alert-success"
            );
          }
        },
        data,
        { "Content-Type": "multipart/form-data" }
      ).catch((error) => {
        messageToShowUser(
          t(
            `Sorry it seems that server is not responding. Please try again later!\n${error}`
          ),
          "alert alert-danger"
        );
      });
    }
    CloseModal();
  };

  const handleOnBlogButtonClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    blog: BlogInterface
  ) => {
    event.preventDefault();
    setBlog(blog);
  };

  const [formIsValid, setFormIsValid] = useState(true);

  return (
    <>
      {blog && (
        <div className="row pb-3 background-div">
          {canEdit && (
            <>
              <ModalComponent
                buttonClassName="m-3 btn btn-sm btn-outline-secondary"
                buttonFontAwesome="fas fa-edit"
                onButtonClick={(event) => {
                  handleOnBlogButtonClick(event, blog);
                }}
                // onModalClose={handleOnModalClosed},
                large={true}
              >
                <BlogFormMaker
                  blog={blog}
                  setFormIsValid={setFormIsValid}
                  formIsValid={formIsValid}
                  handleProfileUpdated={handleOnBlogFormSubmit}
                />
              </ModalComponent>
              <DeleteBlog blog={blog} messageToShowUser={messageToShowUser} />
            </>
          )}
          <div className="col-lg-12 col-md-12 col-sm-12 text-center my-5">
            <h1 className="mb-4">
              {ConvertEnglishDigitToPersianOrArabic(blog.title)}
            </h1>
            <div className="col-lg-7 col-md-12 mx-auto">
              {!imageLoaded && (
                <div className="main-item">
                  <div className="animated-background rounded">
                    <div className="background-masker"></div>
                  </div>
                </div>
              )}
              <img
                className={`img-fluid rounded ${!imageLoaded ? "d-none" : ""}`}
                src={`${blog.images}`}
                alt={blog.title}
                width="600px"
                height="400px"
                onLoad={handleImageLoad}
                onError={handleImageError}
              />
            </div>
          </div>
          <div
            className="ql-editor col-12 my-3"
            dangerouslySetInnerHTML={{
              __html: ConvertEnglishDigitToPersianOrArabic(blog.body),
            }}
          />
        </div>
      )}
    </>
  );
}
