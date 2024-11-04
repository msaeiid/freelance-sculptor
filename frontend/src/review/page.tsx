import { useEffect, useState } from "react";
import { lookup } from "../lookup";
import { AddReviewComponent } from "./add";
import { TestimonialInterface } from "./testimonial";
import { UpdateReviewComponent } from "./update";
import { NavbarComponent } from "../navbar";
import { useTranslation } from "react-i18next";
import { languageDirection } from "../main";
import { paths_dict } from "../lookup/url";

export function ReviewPageComponent() {
  const { t } = useTranslation();
  const [ReviewLoaded, setReviewLoaded] = useState(false);
  const [reviews, setReviews] = useState<TestimonialInterface[]>([]);

  const handleReviewLookup = (
    response: TestimonialInterface[],
    status: number
  ) => {
    if (status === 200) {
      setReviewLoaded(true);
      setReviews(response);
    }
  };
  useEffect(() => {});
  if (!ReviewLoaded) {
    lookup(
      "GET",
      paths_dict.review,
      handleReviewLookup,
      {},
      { "Content-Type": "application/json" }
    );
  }

  const messageToShowUser = (message: string, alert_type: string) => {
    const review_display = document.getElementById("review_display");
    if (review_display) {
      review_display.innerHTML = `<div class='${alert_type}'> <button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times; </button> <strong>${message}</strong></div>`;
    }
  };

  return (
    <>
      <NavbarComponent home={false} />
      <div
        className={`col-lg-7 col-md-10 col-sm-12 py-5 my-5 mx-auto ${languageDirection}`}
        dir={`${languageDirection}`}
      >
        <div id="review_display"></div>
        <div className="row portfolio-container">
          <div className="col-12 mr-lg-5 pb-5 pl-lg-5 pr-lg-5 rounded">
            <div className="mb-1 ml-lg-5">
              <h2 className="my-5">{t("Review")}</h2>
              <AddReviewComponent
                setReviews={setReviews}
                reviews={reviews}
                messageToShowUser={messageToShowUser}
              />
            </div>
            <div className="pt-2 pl-lg-4 ml-lg-2">
              <UpdateReviewComponent
                reviews={reviews}
                setReviews={setReviews}
                messageToShowUser={messageToShowUser}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
