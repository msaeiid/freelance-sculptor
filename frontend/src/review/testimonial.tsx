import { ConvertEnglishDigitToPersianOrArabic } from "../lookup/fa";

export interface TestimonialInterface {
  id: number;
  title: string;
  profession: string;
  avatar: URL;
  comment: string;
}
export function TestimonialComponent(props: TestimonialInterface) {
  const { title, profession, avatar, comment } = props;
  return (
    <div className="text-center">
      <i className="fa fa-3x fa-quote-left text-primary mb-4"></i>
      <h4 className="font-weight-light mb-4">{comment}</h4>
      <img
        className="img-fluid rounded-circle mx-auto mb-3 testimonial_img"
        src={avatar.toString()}
        style={{ width: "80px", height: "80px" }}
        alt={`${title}`}
      />
      <h5 className="font-weight-bold m-0">
        {ConvertEnglishDigitToPersianOrArabic(title)}
      </h5>
      <span>{ConvertEnglishDigitToPersianOrArabic(profession)}</span>
    </div>
  );
}
