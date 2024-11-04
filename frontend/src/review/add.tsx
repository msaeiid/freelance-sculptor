import { Dispatch, SetStateAction, useState } from "react";
import { lookup } from "../lookup/components";
import { ModalComponent } from "../components";
import { TestimonialInterface } from "./testimonial";
import { ReviewFormMaker } from "./form";
import { useTranslation } from "react-i18next";
import { paths_dict } from "../lookup/url";

interface AddReviewComponentInterface {
  setReviews: Dispatch<SetStateAction<TestimonialInterface[]>>;
  reviews: TestimonialInterface[];
  messageToShowUser: (message: string, alert_type: string) => void;
}
export function AddReviewComponent(props: AddReviewComponentInterface) {
  const { setReviews, reviews, messageToShowUser } = props;

  const { t } = useTranslation();

  const CloseModal = () => {
    const modalCloseButton = document.getElementById("closeModal");
    modalCloseButton?.click();
  };

  const handleOnReviewAddFormSubmit = (data: any) => {
    const endpoint = `${paths_dict.review}`;
    if (data.avatar.name === "") {
      delete data.avatar;
    }
    lookup(
      "POST",
      endpoint,
      (response, status) => {
        if (status === 201) {
          CloseModal();
          setReviews([...reviews, response]);
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

  const default_data = {
    id: 0,
    title: "",
    profession: "",
    avatar: new URL("#", window.location.href),
    comment: "",
  };

  const [formIsValid, setFormIsValid] = useState(true);
  return (
    <ModalComponent
      buttonClassName={"btn btn-outline-secondary m-3"}
      buttonFontAwesome={"fas fa-plus"}
      children={
        <ReviewFormMaker
          review={default_data}
          setFormIsValid={setFormIsValid}
          formIsValid={formIsValid}
          handleProfileUpdated={handleOnReviewAddFormSubmit}
        />
      }
      large={true}
    ></ModalComponent>
  );
}
