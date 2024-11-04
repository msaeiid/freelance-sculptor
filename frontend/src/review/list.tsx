import { useEffect, useState } from "react";
import { lookup } from "../lookup";
import { paths_dict } from "../lookup/url";
import { TestimonialInterface } from "./testimonial";
import { TestimonialCarousel } from "./carousel";

export function TestimonialList() {
  const [testimonialLoaded, setTestimonialLoaded] = useState(false);
  const [testimonials, setTestimonials] = useState<TestimonialInterface[]>([]);
  const handleTestimonialLookup = (
    response: TestimonialInterface[],
    status: number
  ) => {
    if (status === 200) {
      setTestimonialLoaded(true);
      setTestimonials(response);
    }
  };
  useEffect(() => {});
  if (!testimonialLoaded) {
    lookup(
      "GET",
      paths_dict.review,
      handleTestimonialLookup,
      {},
      { "Content-Type": "application/json" }
    );
  }
  return (
    <>
      {testimonialLoaded && <TestimonialCarousel testimonials={testimonials} />}
    </>
  );
}
