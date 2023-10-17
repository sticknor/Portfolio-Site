// React
import React, { useState, useEffect } from "react";
import { Routes, HashRouter, Route } from "react-router-dom";

// Style
import { createGlobalStyle } from "styled-components";

// Helmet
import Helmet from "react-helmet";

// Splash
import SplashImage from "./splash.jpg";

// Screens
import Home from "./components/Home";
import Page from "./components/Page";
import PriceListPage from "./components/PriceListPage";
import InstagramEmbedPage from "./components/InstagramEmbedPage";
import Menu from "./components/Menu";

// Style
import "./App.css";
import AboutPage from "./components/AboutPage";

export default function App() {
  // const { location } = useLocation();

  // Site-Wide State
  const [siteTitle, setSiteTitle] = useState("Sam Ticknor");
  const [siteFavicon, setSiteFavicon] = useState("🔅");
  const [homeSplashImages, setHomeSplashImages] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Airtable vars
  const [globalCss, setGlobalCss] = useState("");

  // AIRTABLE CONTENT
  var Airtable = require("airtable");
  Airtable.configure({
    endpointUrl: "https://api.airtable.com",
    apiKey: "keyCVfnd8GGLw029l", // a read-only key
  });
  const base = Airtable.base("appf9UorVjkfwZqAo");

  useEffect(() => {
    base("About")
      .select({ view: "Grid view" })
      .firstPage(function (err, records) {
        if (err) {
          console.error(err);
          return;
        }
        let _siteTitle;
        let _siteFavicon;
        let _homeSplashImages;
        records.forEach(function (record) {
          _siteTitle = record.get("Site Title");
          // _homeSplashImages = record.get("Splash Images");
          _siteFavicon = record.get("Emoji Favicon");
        });
        setSiteTitle(_siteTitle);
        setSiteFavicon(_siteFavicon);
        // setHomeSplashImages(_homeSplashImages);
      });

    base("Index")
      .select({ view: "Grid view" })
      .firstPage(function (err, records) {
        if (err) {
          console.error(err);
          return;
        }
        const _menuItems = [];
        records.forEach((record) => {
          const pageTitle = record.get("Page Title");
          const pageSubtitle = record.get("Page Subtitle");
          const pageRoute = pageTitle.replaceAll(" ", "-").toLowerCase();
          const pageIsPriceList = record.get("Price List");
          const pageIsInstagramEmbed = record.get("Instagram");
          const pageIsAboutPage = record.get("About Page");
          const showInMenu = record.get("Show In Menu");
          if (pageIsPriceList) {
            const _pricePage = {
              pageTitle,
              pageSubtitle,
              pageRoute,
              pageIsPriceList,
              showInMenu,
            };
            _menuItems.push(_pricePage);
          } else if (pageIsAboutPage) {
            const _aboutPage = {
              pageTitle,
              pageSubtitle,
              pageRoute,
              pageIsAboutPage,
              showInMenu,
            };
            _menuItems.push(_aboutPage);
          } else if (pageIsInstagramEmbed) {
            _menuItems.push({
              pageTitle,
              pageSubtitle,
              pageRoute,
              pageIsInstagramEmbed,
              showInMenu,
            });
          } else {
            _menuItems.push({
              pageTitle,
              pageSubtitle,
              pageRoute,
              showInMenu,
            });
          }
        });
        setMenuItems(_menuItems);
        setIsLoading(false);
      });
  }, []);

  // STYLE CONFIG
  const GlobalStyles = createGlobalStyle`
    body {
      ${(props) => props.globalCss}
    }
  `;

  // MARKUP
  return (
    <HashRouter basename="/" key={window.location.pathname}>
      <Helmet>
        <title>{siteTitle}</title>
        <link
          rel="icon"
          href={`data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>${siteFavicon}</text></svg>`}
          sizes="16x16"
        />
      </Helmet>
      <GlobalStyles globalCss={globalCss} />
      {/* MENU */}
      <Menu siteTitle={siteTitle} menuItems={menuItems} isLoading={isLoading} />
      <Routes key={window.location.pathname}>
        {menuItems.map((menuItem) => {
          if (menuItem.pageIsAboutPage) {
            return (
              <Route
                key={`${menuItem.pageRoute}`}
                path={`${menuItem.pageRoute}`}
                element={<AboutPage base={base} page={menuItem} />}
              />
            );
          } else if (menuItem.pageIsPriceList) {
            return (
              <Route
                key={`${menuItem.pageRoute}`}
                path={`${menuItem.pageRoute}`}
                element={<PriceListPage base={base} page={menuItem} />}
              />
            );
          } else if (menuItem.pageIsInstagramEmbed) {
            return (
              <Route
                key={`${menuItem.pageRoute}`}
                path={`${menuItem.pageRoute}`}
                element={<InstagramEmbedPage base={base} page={menuItem} />}
              />
            );
          }
          return (
            <Route
              key={`${menuItem.pageRoute}`}
              path={`${menuItem.pageRoute}`}
              element={<Page base={base} page={menuItem} />}
            />
          );
        })}

        <Route path="/" element={<Home splashImages={SplashImage} />} />
      </Routes>
    </HashRouter>
  );
}
