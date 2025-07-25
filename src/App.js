// React
import React, { useState, useEffect } from "react";
import { Routes, HashRouter, Route } from "react-router-dom";

// Helmet
import Helmet from "react-helmet";

// Screens
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import PageInstallation from "./components/PageInstallation";
import PageProcess from "./components/PageProcess";
import PageCollections from "./components/PageCollections";
import PageDateCollections from "./components/PageDateCollections";
import PageAbout from "./components/PageAbout";
import PageContact from "./components/PageContact";
import PageCV from "./components/PageCV";
import AnalyticsPageView from "./components/Analytics";

// Style
import "./App.css";

export default function App() {
  // Site-Wide State - with individual loading states for progressive loading
  const [siteTitle, setSiteTitle] = useState("Sam Ticknor");
  const [homeSplashImages, setHomeSplashImages] = useState([]);
  const [collections, setCollections] = useState([]);
  const [dateCollections, setDateCollections] = useState({});
  const [processPosts, setProcessPosts] = useState([]);
  const [allWorksById, setAllWorksById] = useState({});
  const [installations, setInstallations] = useState([]);

  // Individual loading states for progressive rendering
  const [loadingStates, setLoadingStates] = useState({
    about: true,
    works: true,
    collections: true,
    installations: true,
    process: true,
  });

  // AIRTABLE CONTENT
  var Airtable = require("airtable");
  Airtable.configure({
    endpointUrl: "https://api.airtable.com",
    apiKey:
      "pattHY0czY5YOotHV.e0784aa4aa945b3303da15e14c71b08f80cdf91802cc481c260c880ec890af04", // a read-only key
  });
  const base = Airtable.base("apptr77RaXLy74iuy");

  useEffect(() => {
    // Get information from about table - load immediately
    base("About")
      .select({
        view: "Grid view",
      })
      .firstPage(function (err, records) {
        if (err) {
          console.error(err);
          return;
        }
        let _siteTitle;
        let _homeSplashImages;
        records.forEach(function (record) {
          _siteTitle = record.get("Site Title");
          _homeSplashImages = record.get("Splash Images");
        });
        setSiteTitle(_siteTitle);
        setHomeSplashImages(_homeSplashImages);
        setLoadingStates((prev) => ({ ...prev, about: false }));
      });

    // Get information from process table - load independently
    base("Process")
      .select({ view: "Grid view" })
      .firstPage(function (err, records) {
        if (err) {
          console.error(err);
          setLoadingStates((prev) => ({ ...prev, process: false }));
          return;
        }
        let _processPosts = [];
        records.forEach(function (record) {
          const postImages = record.get("Images");
          if (record.get("Show On Page")) {
            _processPosts.push({
              title: record.get("Title"),
              date: record.get("Date"),
              imageLinks: postImages.map((workImage) => {
                return workImage.url;
              }),
              text: record.get("Text"),
            });
          }
        });
        setProcessPosts(_processPosts);
        setLoadingStates((prev) => ({ ...prev, process: false }));
      });

    // Get all works from works table - load independently
    let _allWorksById = {};
    let _dateCollections = {};
    base("Works")
      .select({
        view: "Grid view",
      })
      .eachPage(
        function page(records, fetchNextPage) {
          records.forEach(function (record) {
            // put work into dictionary indexed by ID
            const workImages = record.get("Image");
            _allWorksById[record.id] = {
              imageLink:
                workImages && workImages.length > 0
                  ? workImages[0].url
                  : undefined,
              videoLink: record.get("Video Link"),
              title: record.get("Title"),
              year: record.get("Year"),
              medium: record.get("Medium"),
              width: record.get("Width"),
              height: record.get("Height"),
              depth: record.get("Depth"),
              description: record.get("Description"),
            };

            // if work belongs to a year collection,
            // put into year dictionary
            let workDate = record.get("Date Collection");
            if (workDate !== undefined && workDate !== "") {
              if (_dateCollections[workDate]) {
                _dateCollections[workDate].push(record.id);
              } else {
                _dateCollections[workDate] = [record.id];
              }
            }
          });
          fetchNextPage();
        },
        function done(err) {
          setAllWorksById({ ..._allWorksById });
          setDateCollections({ ..._dateCollections });
          setLoadingStates((prev) => ({ ...prev, works: false }));

          if (err) {
            console.error(err);
            return;
          }
        }
      );
  }, []);

  // Load collections and installations after works are available
  useEffect(() => {
    if (loadingStates.works) return; // Wait for works to load first

    // Get menu items from collections index
    base("Collections Index")
      .select({ view: "Grid view" })
      .firstPage(function (err, records) {
        if (err) {
          console.error(err);
          setLoadingStates((prev) => ({ ...prev, collections: false }));
          return;
        }
        const _collections = [];
        records.forEach((record) => {
          _collections.push({
            route: record.get("Route"),
            title: record.get("Title"),
            tableName: record.get("Title"),
            showInMenu: record.get("Show In Menu"),
            years: record.get("Years"),
            collectionStatement: record.get("Collection Statement"),
          });
        });
        setCollections([..._collections]);
        setLoadingStates((prev) => ({ ...prev, collections: false }));
      });

    // Get installations index
    base("Installations Index")
      .select({ view: "Grid view" })
      .firstPage(function (err, records) {
        if (err) {
          console.error(err);
          setLoadingStates((prev) => ({ ...prev, installations: false }));
          return;
        }
        const _installations = [];
        records.forEach((record) => {
          const installationImage = record.get("Image");
          _installations.push({
            route: record.get("Route"),
            title: record.get("Title"),
            tableName: record.get("Title"),
            showInMenu: record.get("Show In Menu"),
            link: record.get("Link"),
            dates: record.get("Dates"),
            location: record.get("Location"),
            imageLink:
              installationImage && installationImage.length > 0
                ? installationImage[0].url
                : undefined,
          });
        });
        setInstallations(_installations);
        setLoadingStates((prev) => ({ ...prev, installations: false }));
      });
  }, [loadingStates.works]);

  // MARKUP - Show content immediately with progressive loading
  return (
    <HashRouter basename="/" key={window.location.pathname}>
      <AnalyticsPageView />
      <Helmet>
        <title>{siteTitle}</title>
      </Helmet>

      <Navbar showProcess={processPosts && processPosts.length > 0} />

      <Routes>
        <Route
          path="/CV"
          element={<PageCV base={base} page={{ pageTitle: "CV" }} />}
        />

        {Object.keys(dateCollections).map((dateCollectionID) => {
          let collection = dateCollections[dateCollectionID];
          return (
            <Route
              key={`${dateCollectionID}`}
              path={`${dateCollectionID}`}
              element={
                <PageDateCollections
                  base={base}
                  works={collection}
                  date={dateCollectionID}
                  dateCollections={dateCollections}
                  allWorksById={allWorksById}
                />
              }
            />
          );
        })}

        {collections.map((collection) => {
          return (
            <Route
              key={`${collection.route}`}
              path={`${collection.route}`}
              element={
                <PageCollections
                  base={base}
                  collection={collection}
                  allWorksById={allWorksById}
                />
              }
            />
          );
        })}

        {installations.map((installation) => {
          return (
            <Route
              key={`${installation.route}`}
              path={`${installation.route}`}
              element={
                <PageInstallation
                  base={base}
                  page={installation}
                  allWorksById={allWorksById}
                />
              }
            />
          );
        })}

        <Route
          key={"process"}
          path={"process"}
          element={<PageProcess posts={processPosts} />}
        />

        <Route
          key={"about"}
          path={"about"}
          element={<PageAbout base={base} />}
        />

        <Route
          key={"contact"}
          path={"contact"}
          element={<PageContact base={base} />}
        />

        <Route
          path="/"
          element={
            <Home
              splashImages={homeSplashImages}
              collections={collections}
              dateCollections={dateCollections}
              installations={installations}
              loadingStates={loadingStates}
            />
          }
        />
      </Routes>
    </HashRouter>
  );
}
