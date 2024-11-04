import { language } from "../main";

export const getLocalizedDate = (
  date: Date,
  onlyDay = false,
  onlyMonthYear = false
) => {
  const selectedDate = date !== undefined ? new Date(date) : new Date();

  const optionsFull: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const optionsMonthAndYear: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
  };
  const optionsDay: Intl.DateTimeFormatOptions = {
    day: "numeric",
  };

  const option =
    !onlyDay && !onlyMonthYear
      ? optionsFull
      : onlyDay
      ? optionsDay
      : onlyMonthYear
      ? optionsMonthAndYear
      : optionsFull;

  return new Intl.DateTimeFormat(language, option).format(selectedDate);
};
