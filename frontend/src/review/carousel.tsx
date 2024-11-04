import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { TestimonialInterface } from "./testimonial";

export function TestimonialCarousel({
  testimonials,
}: {
  testimonials: TestimonialInterface[];
}) {
  return (
    <Carousel
      autoPlay
      interval={1500}
      showStatus={false}
      showThumbs={false}
      infiniteLoop
      showIndicators={false}
    >
      {testimonials.map((testimonial: TestimonialInterface, index: number) => (
        <div className="text-center" key={`${index}-${testimonial.id}`}>
          <i className="fa fa-3x fa-quote-left text-primary mb-4"></i>
          <div className="container">
            <h4 className="font-weight-light mb-4 truncate">
              {testimonial.comment}
            </h4>
          </div>
          <img
            className="img-fluid rounded-circle mx-auto mb-3 testimonial_img"
            src={`${testimonial.avatar}`}
            alt={`${testimonial.title}`}
            style={{ width: "80px", height: "80px" }}
          />
          <h5 className="font-weight-bold m-0 truncate">{testimonial.title}</h5>
          <span className="truncate">{testimonial.profession}</span>
        </div>
      ))}
    </Carousel>
  );
}
