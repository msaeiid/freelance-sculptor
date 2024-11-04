import Input from "../components/input";
import { UpdateProfileInterface } from "./update";
import { useTranslation } from "react-i18next";

interface SettingComponentInterface {
  profile: UpdateProfileInterface;
  handleOnchange: (tagName: string, validationResult: boolean) => void;
}

export function SocialMedia(props: SettingComponentInterface) {
  const { profile, handleOnchange } = props;
  const { t } = useTranslation();
  return (
    <>
      <div className="text-center mb-3">
        <a
          className="btn btn-outline-primary btn-sm"
          data-toggle="collapse"
          href="#socialMedia"
          role="button"
          aria-expanded="false"
          aria-controls="collapseExample"
        >
          <i className="fas fa-hashtag">{t(" Social Media")}</i>
        </a>
      </div>
      <div className="collapse" id="socialMedia">
        <p className="text-primary text-center">
          {t("These items show on footer")}
        </p>
        <Input
          type="url"
          className="form-control"
          placeholder={t("Tweeter")}
          label={t("Tweeter")}
          name="tweeter"
          defaultValue={profile.tweeter}
          onChange={handleOnchange}
          hide_label={true}
        />
        <Input
          type="url"
          className="form-control"
          placeholder={t("Facebook")}
          label={t("Facebook")}
          name="facebook"
          defaultValue={profile.facebook}
          onChange={handleOnchange}
          hide_label={true}
        />
        <Input
          type="url"
          className="form-control"
          placeholder={t("Linkedin")}
          label={t("Linkedin")}
          name="linkedin"
          defaultValue={profile.linkedin}
          onChange={handleOnchange}
          hide_label={true}
        />
        <Input
          type="url"
          className="form-control"
          placeholder={t("Instagram")}
          label={t("Instagram")}
          name="instagram"
          defaultValue={profile.instagram}
          onChange={handleOnchange}
          hide_label={true}
        />
      </div>
    </>
  );
}
