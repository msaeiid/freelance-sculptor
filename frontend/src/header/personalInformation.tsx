import Input from "../components/input";
import { UpdateProfileInterface } from "./update";
import { useTranslation } from "react-i18next";

interface SettingComponentInterface {
  profile: UpdateProfileInterface;
  handleOnchange: (tagName: string, validationResult: boolean) => void;
}

export function Personal(props: SettingComponentInterface) {
  const { profile, handleOnchange } = props;
  const { t } = useTranslation();
  return (
    <>
      <div className="text-center mb-3">
        <a
          className="btn btn-outline-primary btn-sm"
          data-toggle="collapse"
          href="#personal"
          role="button"
          aria-expanded="false"
          aria-controls="collapseExample"
        >
          <i className="fa fa-user">{t(" Personal")}</i>
        </a>
      </div>
      <div className="collapse" id="personal">
        <p className="text-primary text-center">
          {t("Update your personal data")}
        </p>
        <Input
          type="text"
          className="form-control"
          label={t("Name")}
          placeholder={t("Name")}
          name="first_name" // Add the name attribute
          defaultValue={profile.first_name}
          onChange={handleOnchange}
          hide_label={true}
        />
        <Input
          type="text"
          className="form-control"
          label={t("Family")}
          placeholder={t("Family")}
          defaultValue={profile.last_name}
          name="last_name"
          onChange={handleOnchange}
          hide_label={true}
        />
        <Input
          type="url"
          className="form-control"
          placeholder={t("video embed url introduce yourself")}
          label={t("Video")}
          name="video"
          defaultValue={profile.video.toString()}
          onChange={handleOnchange}
          hide_label={true}
        />
        <Input
          type="text"
          className="form-control"
          placeholder={t("Title")}
          label={t("Title")}
          name="home_page_title"
          defaultValue={profile.home_page_title}
          onChange={handleOnchange}
          hide_label={true}
        />
      </div>
    </>
  );
}
