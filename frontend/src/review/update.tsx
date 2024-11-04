import { useState } from "react";
import { TestimonialInterface } from "./testimonial";
import { lookup } from "../lookup/components";
import { ModalComponent } from "../components";
import { DeleteReview } from "./delete";
import { ReviewFormMaker } from "./form";
import { useTranslation } from "react-i18next";
import { paths_dict } from "../lookup/url";

interface UpdateReviewComponentInterface {
  reviews: TestimonialInterface[];
  setReviews: (data: any) => void;
  messageToShowUser: (message: string, alert_type: string) => void;
}
export function UpdateReviewComponent(props: UpdateReviewComponentInterface) {
  const { reviews, setReviews, messageToShowUser } = props;
  const { t } = useTranslation();
  const [selectedReview, setSelectedReview] = useState<TestimonialInterface>({
    id: 0,
    title: "",
    profession: "",
    avatar: new URL("", window.location.href),
    comment: "",
  });

  const CloseModal = () => {
    const modalCloseButton = document.getElementById("closeModal");
    modalCloseButton?.click();
  };

  const handleOnSkillFormSubmit = (data: any, isChanged: boolean) => {
    const endpoint = `${paths_dict.review}${data.id}/`;
    if (data.avatar.name === "") {
      delete data.avatar;
    }
    if (isChanged) {
      lookup(
        "PUT",
        endpoint,
        (response, status) => {
          if (status === 200) {
            const updatedReviews = reviews.map((review) => {
              if (review.id === response.id) {
                return response;
              }
              return review;
            });
            setReviews(updatedReviews);
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

  const handleOnSkillButtonClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    testimonial: TestimonialInterface
  ) => {
    event.preventDefault();
    setSelectedReview(testimonial);
  };

  const handleOnModalClosed = (status: boolean) => {
    if (!status) {
      setSelectedReview({
        id: 0,
        title: "",
        profession: "",
        avatar: new URL("", window.location.href),
        comment: "",
      });
    }
  };
  const [formIsValid, setFormIsValid] = useState(true);

  return (
    <div className="row align-items-center">
      {reviews.map((review: TestimonialInterface, index: number) => {
        return (
          <div
            className="text-center col-lg-4 col-md-4 col-sm-12 mb-5"
            key={`${index}-${review.id}`}
          >
            <img
              className="img-fluid rounded-circle mx-auto mb-3 testimonial_img"
              src={`${review.avatar}`}
              style={{ width: "80px", height: "80px" }}
              alt={`${review.title}`}
            />
            <h5 className="font-weight-bold m-0">{review.title}</h5>
            <span>{review.profession}</span>
            <p className="font-weight-light mb-4">{review.comment}</p>
            <ModalComponent
              large={true}
              buttonClassName={"btn btn-sm btn-outline-secondary"}
              buttonFontAwesome={"fas fa-edit"}
              onButtonClick={(event) => {
                handleOnSkillButtonClick(event, review);
              }}
              onModalClose={handleOnModalClosed}
            >
              <ReviewFormMaker
                review={selectedReview}
                setFormIsValid={setFormIsValid}
                formIsValid={formIsValid}
                handleProfileUpdated={handleOnSkillFormSubmit}
              />
            </ModalComponent>
            <DeleteReview
              review={review}
              reviews={reviews}
              setReviews={setReviews}
              messageToShowUser={messageToShowUser}
            />
          </div>
        );
      })}
    </div>
  );
}
