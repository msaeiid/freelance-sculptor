import { useState } from "react";
import { lookup } from "../lookup/components";
import { useTranslation } from "react-i18next";
import { paths_dict } from "../lookup/url";
import { languageDirection } from "../main";

interface LanguageComponent {
  code: string;
  title: string;
}

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const [languages, setLanguages] = useState<LanguageComponent[]>([]);
  const [languagesLoaded, setLanguagesLoaded] = useState(false);
  const { t } = useTranslation();

  useState(() => {
    lookup(
      "GET",
      paths_dict.language,
      (response: any, status: number) => {
        if (status === 200) {
          setLanguages(response);
          setLanguagesLoaded(true);
        }
      },
      {},
      { "Content-Type": "multipart/form-data" }
    ).catch(() => {
      console.log("languages isn't loaded");
    });
  });
  return (
    <div className="text-center" dir={`${languageDirection}`}>
      {languagesLoaded && (
        <>
          <span className="text-secodary mx-2">|</span>
          {languages.map((value: LanguageComponent, index: number) => (
            <span key={index}>
              <a
                href={`/${value.code}`}
                type="button"
                className={`mx-1 mt-3 text-white text-decoration-none ${
                  value.title === i18n.language ? "active" : ""
                }`}
                // onClick={() => {
                //   navigate(`/${value.code.toLowerCase()}/`);
                //   window.location.reload();
                //   i18n.changeLanguage(value.code);
                // }}
              >
                {t(value.title)}
              </a>
              <span className="text-secondary mx-2">|</span>
            </span>
          ))}
        </>
      )}
    </div>
  );
};

export default LanguageSelector;
