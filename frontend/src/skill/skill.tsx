import { ConvertEnglishDigitToPersianOrArabic } from "../lookup/fa";
import { languageDirection } from "../main";
export interface SkillInterface {
  id: number;
  title: string;
  percentage: number;
  color: string;
  scrolledOn: boolean;
}
export function SkillComponent(props: SkillInterface) {
  const { title, percentage, color, scrolledOn } = props;

  return (
    <div
      className={`col-md-6 ${languageDirection}`}
      dir={`${languageDirection}`}
    >
      <div className="skill mb-4">
        <div className="d-flex justify-content-between">
          <h6 className="font-weight-bold truncate">
            {ConvertEnglishDigitToPersianOrArabic(title)}
          </h6>
          <h6 className="font-weight-bold">
            {ConvertEnglishDigitToPersianOrArabic(percentage.toString())}%
          </h6>
        </div>
        <div className="progress">
          <div
            className="progress-bar"
            role="progressbar"
            style={
              scrolledOn
                ? { width: `${percentage}%`, backgroundColor: color }
                : { width: `0%`, backgroundColor: color }
            }
            aria-valuenow={scrolledOn ? percentage : 0}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="fuels"
          ></div>
        </div>
      </div>
    </div>
  );
}
