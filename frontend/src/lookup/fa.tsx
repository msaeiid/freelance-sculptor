import { language } from "../main";

interface DigitMap {
  [key: string]: string;
}

const EnglishToPersianOrArabicMap: DigitMap = {
  "0": "۰",
  "1": "۱",
  "2": "۲",
  "3": "۳",
  "4": "۴",
  "5": "۵",
  "6": "۶",
  "7": "۷",
  "8": "۸",
  "9": "۹",
};

export const ConvertEnglishDigitToPersianOrArabic = (value: string): string => {
  if ((language === "fa" || language === "ar") && value !== undefined) {
    const persianOrArabicValue = value.replace(/\d/g, (match) => {
      return EnglishToPersianOrArabicMap[match];
    });

    return persianOrArabicValue;
  } else {
    return value;
  }
};
