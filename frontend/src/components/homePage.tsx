import { useEffect, useState } from "react";
import { About } from "../about";
import { BlogSection } from "../blog";
import { Contact } from "../contact";
import { Footer } from "../footer";
import { Home } from "../header";
import { NavbarComponent } from "../navbar";
import { PortfolioSection } from "../portfolio";
import { QualitySection } from "../quality";
import { TestimonialSection } from "../review";
import { ScrollComponent } from "../scroll";
import { ServiceSection } from "../service";
import { SkillSection } from "../skill";
import { lookup } from "../lookup";
import { paths_dict } from "../lookup/url";
import { MainPageLoading } from "./mainPageLoading";
import { canEdit } from "../main";

export interface UserInterface {
  // first_name: string;
  // last_name: string;
  email: string;
}

export interface SectionInterface {
  status: boolean;
}

export interface ProfileInterface {
  //Header fields
  user: UserInterface;
  first_name: string;
  last_name: string;
  home_image: URL;
  home_page_title: string;
  cv: URL;
  video: string;
  tweeter: URL;
  facebook: URL;
  linkedin: URL;
  instagram: URL;
  // Section Show control
  quality_public: boolean;
  skill_public: boolean;
  service_public: boolean;
  portfolio_public: boolean;
  review_public: boolean;
  blog_public: boolean;
  contact_public: boolean;
  //about section fields
  about_image: URL;
  about_me_title: string;
  summary: string;
  birth_day: Date;
  degree: string;
  experience_period: string;
  phone: string;
  address: string;
  freelance: boolean;
}

export interface HomeAboutInterface {
  profileData: ProfileInterface;
  setProfileData: (response: ProfileInterface) => void;
  profileLoaded: boolean;
}

export function HomePageComponent() {
  const [profileData, setProfileData] = useState<ProfileInterface>({
    user: { email: "" },
    first_name: "",
    last_name: "",
    home_image: new URL("", window.location.href),
    home_page_title: "",
    cv: new URL("", window.location.href),
    video: "",
    //Social media
    tweeter: new URL("", window.location.href),
    facebook: new URL("", window.location.href),
    linkedin: new URL("", window.location.href),
    instagram: new URL("", window.location.href),
    // Section Show control
    quality_public: false,
    skill_public: false,
    service_public: false,
    portfolio_public: false,
    review_public: false,
    blog_public: false,
    contact_public: false,
    //about section fields
    about_image: new URL("", window.location.href),
    about_me_title: "",
    summary: "",
    birth_day: new Date(),
    degree: "",
    experience_period: "",
    phone: "",
    address: "",
    freelance: false,
  });

  const [profileLoaded, setProfileLoaded] = useState(false);

  const handleProfileInfoLookup = (
    response: ProfileInterface,
    status: number
  ) => {
    if (status === 200) {
      setProfileLoaded(true);
      setProfileData(response);
    }
  };

  useEffect(() => {
    if (!profileLoaded) {
      lookup(
        "GET",
        paths_dict.profile,
        handleProfileInfoLookup,
        {},
        { "Content-Type": "application/json" }
      );
    }
  }, [profileData, profileLoaded]);
  return (
    <>
      {!profileLoaded && <MainPageLoading />}
      {profileLoaded && (
        <>
          <NavbarComponent profileData={profileData} home={true} />
          <Home
            profileData={profileData}
            setProfileData={setProfileData}
            profileLoaded={profileLoaded}
          />
          <About
            profileData={profileData}
            setProfileData={setProfileData}
            profileLoaded={profileLoaded}
          />
          {(profileData.quality_public || canEdit) && (
            <QualitySection status={profileData.quality_public} />
          )}
          {(profileData.skill_public || canEdit) && (
            <SkillSection status={profileData.skill_public} />
          )}
          {(profileData.service_public || canEdit) && (
            <ServiceSection status={profileData.service_public} />
          )}
          {(profileData.portfolio_public || canEdit) && (
            <PortfolioSection status={profileData.portfolio_public} />
          )}
          {(profileData.review_public || canEdit) && (
            <TestimonialSection status={profileData.review_public} />
          )}
          {(profileData.blog_public || canEdit) && (
            <BlogSection status={profileData.blog_public} />
          )}
          {(profileData.contact_public || canEdit) && (
            <Contact status={profileData.contact_public} canEdit={canEdit} />
          )}
          <Footer
            profileData={profileData}
            setProfileData={setProfileData}
            profileLoaded={profileLoaded}
          />
          <ScrollComponent />
        </>
      )}
    </>
  );
}
