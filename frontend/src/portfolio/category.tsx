import { ConvertEnglishDigitToPersianOrArabic } from "../lookup/fa";
import { UpdateCategoryComponent } from "./updateCategory";
import { useTranslation } from "react-i18next";

export interface CategoryInterface {
  id: number;
  title: string;
}
export interface CategoryComponentInterface {
  category: CategoryInterface;
  categories: CategoryInterface[];
  activeCategory: string;
  handleCategoryClick: (category: CategoryInterface) => void;
  expandCategory?: boolean;
  setCategories: (data: CategoryInterface[]) => void;
  messageToShowUser?: (message: string, alert_type: string) => void;
  setRefresh?: (refresh: boolean) => void;
}

export function CategoryComponent(props: CategoryComponentInterface) {
  const {
    category,
    categories,
    activeCategory,
    handleCategoryClick,
    expandCategory,
    setCategories,
    messageToShowUser,
    setRefresh,
  } = props;

  const { t } = useTranslation();
  // const filter_ = category.title === "All" ? "*" : `.${category.title}`;
  const customClass =
    category.title === activeCategory
      ? "btn btn-sm btn-outline-primary m-1 active"
      : "btn btn-sm btn-outline-primary m-1";
  return (
    <>
      {!expandCategory ? (
        <li
          className={customClass}
          onClick={(event) => {
            event.preventDefault();
            handleCategoryClick(category);
          }}
        >
          {ConvertEnglishDigitToPersianOrArabic(category.title)}
        </li>
      ) : (
        <>
          {category.title !== t("All") && (
            <div className="col-12 border-bottom border-primary rounded p-2 m-2">
              <div
                className={`${customClass} col-8 `}
                onClick={(event) => {
                  event.preventDefault();
                  handleCategoryClick(category);
                }}
              >
                {ConvertEnglishDigitToPersianOrArabic(category.title)}
              </div>
              <UpdateCategoryComponent
                category={category}
                categories={categories}
                setCategories={setCategories}
                messageToShowUser={messageToShowUser}
                setRefresh={setRefresh}
              />
            </div>
          )}
        </>
      )}
    </>
  );
}
