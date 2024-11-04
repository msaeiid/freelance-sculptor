import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import App from "./App.tsx";
// import "./index.css";
import { HomePageComponent } from "./components/homePage.tsx";
import React from "react";
import { QualityPageComponent } from "./quality/page.tsx";
import { SkillPageComponent } from "./skill/page.tsx";
import { ServicePageComponent } from "./service/page.tsx";
import { PortfolioPageComponent } from "./portfolio/page.tsx";
import { ReviewPageComponent } from "./review/page.tsx";
import { BlogPageComponent } from "./blog/page.tsx";
import { ContactPageComponent } from "./contact/page.tsx";
import i18n from "i18next";
import { I18nextProvider } from "react-i18next";
import "./i18n.tsx";

const rootElement = document.getElementById("root");
export const username = rootElement?.getAttribute("data-username") || "";
export const canEdit =
  rootElement?.getAttribute("data-canEdit") === "true" ? true : false;

export const loginUrl = rootElement?.getAttribute("data-loginUrl")
  ? new URL(rootElement.getAttribute("data-loginUrl")!, window.location.href)
  : new URL("", window.location.href);

export const language = rootElement?.getAttribute("data-language") || "en";

export const site_domain =
  rootElement?.getAttribute("data-domain") || "localhost";

export const developer_name =
  rootElement?.getAttribute("data-developer-name") || "Developer Name";

export const developer_url =
  rootElement?.getAttribute("data-developer-url") || "Developer URL";

i18n.changeLanguage(language);
export const languageDirection = i18n.dir(i18n.language);
// document.documentElement.dir = languageDirection; //

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <I18nextProvider i18n={i18n}>
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          {/* Default route without language */}
          <Route path="/" element={<HomePageComponent />}></Route>

          {/* Routes for different components */}
          <Route path="/qualities" element={<QualityPageComponent />} />
          <Route path="/skills" element={<SkillPageComponent />} />
          <Route path="/service/:id" element={<ServicePageComponent />} />
          <Route path="/portfolio" element={<PortfolioPageComponent />} />
          <Route path="/reviews" element={<ReviewPageComponent />} />
          <Route path="/blog/:id" element={<BlogPageComponent />} />
          <Route path="/contact/" element={<ContactPageComponent />} />

          {/* Routes for different components with optional language prefix */}
          <Route path="/:lang" element={<HomePageComponent />}></Route>
          <Route path="/:lang/qualities" element={<QualityPageComponent />} />
          <Route path="/:lang/skills" element={<SkillPageComponent />} />
          <Route path="/:lang/service/:id" element={<ServicePageComponent />} />
          <Route path="/:lang/portfolio" element={<PortfolioPageComponent />} />
          <Route path="/:lang/reviews" element={<ReviewPageComponent />} />
          <Route path="/:lang/blog/:id" element={<BlogPageComponent />} />
          <Route path="/:lang/contact/" element={<ContactPageComponent />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  </I18nextProvider>
);
