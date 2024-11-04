import { useEffect, useState } from "react";
import { lookup } from "../lookup";
import { paths_dict } from "../lookup/url";
import { NavbarComponent } from "../navbar";
import { ContactComponent, ContactInterface } from "./contact";
import { useTranslation } from "react-i18next";
import { languageDirection } from "../main";

export interface ContactServerResponse {
  count: number;
  next: URL;
  previous: URL;
  results: ContactInterface[];
}

export function ContactPageComponent() {
  const { t } = useTranslation();
  const [contacts, setContacts] = useState<ContactInterface[]>([]);
  const [contactLoaded, setContactLoaded] = useState(false);
  const [categories] = useState([t("All"), t("Read"), t("Unread")]);
  const [isNext, setIsNext] = useState(false);
  const [loadMoreTouch, setLoadMoreTouch] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [nextPath, setNextPath] = useState("");
  const [currentPath, setCurrentPath] = useState(
    `${paths_dict.contact}?page_size=6`
  );
  const [completeUrl, setCompleteUrl] = useState(false);

  const loadMore = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setCurrentPath(nextPath);
    setLoadMoreTouch(true);
  };

  const handleContactLookup = (
    response: ContactServerResponse,
    status: number
  ) => {
    if (response.next) {
      setIsNext(true);
      // setNextPath(response.next.toString().replace(/^https?:\/\/[^/]+\//, ""));
      setNextPath(response.next.toString());
      setCompleteUrl(true);
    } else {
      setIsNext(false);
      setNextPath("");
      setCompleteUrl(false);
    }
    if (status === 200) {
      let final = [];
      if (loadMoreTouch) {
        final = [...contacts].concat(response.results);
        setLoadMoreTouch(false);
      } else {
        final = [...response.results];
      }
      setContacts(final);
      setContactLoaded(true);
    }
  };

  useEffect(() => {
    if (!contactLoaded || loadMoreTouch) {
      lookup(
        "GET",
        currentPath,
        handleContactLookup,
        {},
        { "Content-Type": "application/json" },
        completeUrl
      );
      setCompleteUrl(false);
    }
  }, [contactLoaded, loadMoreTouch, currentPath, completeUrl, setCompleteUrl]);

  const handleClick = (
    event: React.MouseEvent<HTMLLIElement>,
    category: string
  ) => {
    event.preventDefault();
    setSelectedCategory(category);
  };

  return (
    <>
      <NavbarComponent home={false} />
      <div
        className={`col-lg-7 col-md-10 col-sm-12 py-5 my-5 mx-auto ${languageDirection}`}
        dir={`${languageDirection}`}
      >
        <div className="row">
          <div className="col-12 mr-5 pl-5 pr-5 pb-5 rounded">
            <div className="col-10 text-center my-3">
              <ul className="list-inline mb-4" id="portfolio-filters">
                {categories.map((category, index) => (
                  <li
                    className={`${
                      category === selectedCategory
                        ? "btn btn-sm btn-outline-primary m-1 active"
                        : "btn btn-sm btn-outline-primary m-1"
                    }`}
                    onClick={(event) => handleClick(event, category)}
                    key={`${index}`}
                  >
                    {category}
                  </li>
                ))}
              </ul>
            </div>
            <div className="row">
              <>
                {contactLoaded &&
                  contacts?.map((contact: ContactInterface, index: number) => (
                    <>
                      {selectedCategory === t("All") ||
                      (selectedCategory === t("Read") && contact.is_read) ||
                      (selectedCategory === t("Unread") && !contact.is_read) ? (
                        <div
                          key={`${index}-${contact.id}`}
                          className="col-10 my-3"
                        >
                          <ContactComponent
                            contact={contact}
                            setContacts={setContacts}
                            contacts={contacts}
                          />
                        </div>
                      ) : null}
                    </>
                  ))}
                {isNext && (
                  <div className="col-12 text-center my-5">
                    <button
                      className="btn btn-outline-primary btn-lg"
                      onClick={loadMore}
                    >
                      {t("More")}
                    </button>
                  </div>
                )}
              </>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
