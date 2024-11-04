import { Dispatch, SetStateAction, useState } from "react";
import { lookup } from "../lookup/components";
import { ModalComponent } from "../components";
import { BlogInterface } from "./blog";
import { BlogFormMaker } from "./form";
import { useTranslation } from "react-i18next";
import { paths_dict } from "../lookup/url";

interface AddBlogComponentInterface {
  setBlogs: Dispatch<SetStateAction<BlogInterface[]>>;
  blogs: BlogInterface[];
  messageToShowUser: (message: string, alert_type: string) => void;
}
export function AddBlogComponent(props: AddBlogComponentInterface) {
  const { setBlogs, blogs, messageToShowUser } = props;
  const { t } = useTranslation();

  const CloseModal = () => {
    const modalCloseButton = document.getElementById("closeModal");
    modalCloseButton?.click();
  };

  const handleOnBlogAddFormSubmit = (data: any) => {
    const endpoint = `${paths_dict.blog}`;
    if (data.images.name === "") {
      delete data.images;
    }
    lookup(
      "POST",
      endpoint,
      (response, status) => {
        if (status === 201) {
          CloseModal();
          setBlogs([...blogs, response]);
          messageToShowUser(
            t("objectAdded", { title: response.title }),
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
  };
  const [formIsValid, setFormIsValid] = useState(true);
  const default_data = {
    id: 0,
    images: new URL("", window.location.href),
    title: "",
    created_at: new Date(),
    body: "",
  };
  return (
    <ModalComponent
      buttonClassName={"btn btn-outline-primary m-3"}
      buttonFontAwesome={"fas fa-plus"}
      children={
        <BlogFormMaker
          blog={default_data}
          setFormIsValid={setFormIsValid}
          formIsValid={formIsValid}
          handleProfileUpdated={handleOnBlogAddFormSubmit}
        />
      }
      large={true}
    ></ModalComponent>
  );
}
