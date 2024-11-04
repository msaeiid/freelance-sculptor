import { CategoryComponent, CategoryInterface } from "./category";

interface GalleryFilterInterface {
  categoryLoaded: boolean;
  categories: CategoryInterface[];
  activeCategory: string;
  handleCategoryClick: (category: CategoryInterface) => void;
  expandCategory?: boolean;
  setCategories: (data: CategoryInterface[]) => void;
  messageToShowUser?: (message: string, alert_type: string) => void;
  setRefresh?: (refresh: boolean) => void;
}
export function GalleryFilterComponent(props: GalleryFilterInterface) {
  const {
    categoryLoaded,
    categories,
    activeCategory,
    handleCategoryClick,
    expandCategory,
    setCategories,
    messageToShowUser,
    setRefresh,
  } = props;
  return (
    <>
      {categoryLoaded &&
        categories.map((category, index) => {
          return (
            <span key={index}>
              <CategoryComponent
                key={`${index}-${category.id}`}
                category={category}
                categories={categories}
                activeCategory={activeCategory}
                handleCategoryClick={handleCategoryClick}
                expandCategory={expandCategory}
                setCategories={setCategories}
                messageToShowUser={messageToShowUser}
                setRefresh={setRefresh}
              />
            </span>
          );
        })}
    </>
  );
}
