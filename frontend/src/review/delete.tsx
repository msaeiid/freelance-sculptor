import { ButtonComponent } from "../components";
import { lookup } from "../lookup/components";
import { paths_dict } from "../lookup/url";
import { TestimonialInterface } from "./testimonial";
import { useTranslation } from "react-i18next";

interface DeleteReviewInterface {
  review: TestimonialInterface;
  reviews: TestimonialInterface[];
  setReviews: (data: any) => void;
  messageToShowUser: (message: string, alert_type: string) => void;
}
export function DeleteReview(props: DeleteReviewInterface) {
  const { review, reviews, setReviews, messageToShowUser } = props;
  const { t } = useTranslation();
  const handleLookupCallback = (response: any, status: number) => {
    if (status === 204) {
      // TODO:check
      console.log(response);
      const updatedReviews = reviews.filter((rev) => rev.id !== review.id);
      setReviews(updatedReviews);
      messageToShowUser(
        t("objectRemoved", { title: review.title }),
        "alert alert-success"
      );
    }
  };
  const handleOnClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    const confirmation = window.confirm(
      t("removeConfirm", { title: review.title })
    );
    if (confirmation) {
      const endpoint = `${paths_dict.review}${review.id}/`;
      lookup(
        "DELETE",
        endpoint,
        handleLookupCallback,
        {},
        { "Content-Type": "application/json" }
      ).catch((error) => {
        messageToShowUser(
          t(
            `Sorry it seems that server is not responding. Please try again later!\n${error}`
          ),
          "alert alert-danger"
        );
      });
    }
  };

  return (
    <ButtonComponent
      class_name="m-3 btn btn-sm btn-outline-secondary"
      text={<i className="fas fa-trash-alt"></i>}
      type="button"
      onclick={handleOnClick}
    />
  );
}
