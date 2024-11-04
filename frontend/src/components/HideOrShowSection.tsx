import { useState } from "react";
import { useTranslation } from "react-i18next";
import { paths_dict } from "../lookup/url";
import { lookup } from "../lookup";

interface HideOrShowSectionInterface {
  section: string;
  toggleStatus: boolean;
}
export function HideOrShowSection(props: HideOrShowSectionInterface) {
  const { section, toggleStatus } = props;
  const { t } = useTranslation();
  const [status, setStatus] = useState(toggleStatus);
  const OnChangeToggle = () => {
    const endpoint = `${paths_dict.show_or_hide_section}`;
    const data = {
      section: section,
    };
    lookup(
      "PUT",
      endpoint,
      (response, status) => {
        if (status === 200) {
          setStatus(response[section]);
        }
      },
      data,
      { "Content-Type": "multipart/form-data" }
    );
  };
  return (
    <>
      <div className="m-3">
        {status === true ? t("Hide") : t("Show")} {t("Public")}
        <label className="switch mx-2">
          <input
            type="checkbox"
            onChange={OnChangeToggle}
            defaultChecked={status}
          />
          <span className="slider round"></span>
        </label>
      </div>
    </>
  );
}
