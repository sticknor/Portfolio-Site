import React, { useState } from "react";

/**
 * The "Works by: Collection / Date" toggle menu on the home page.
 * Interactive island; everything else on the home page is static HTML.
 */
function HomeMenus({ collections, dates }) {
  const [toggle, setToggle] = useState("collection");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "8px",
          fontWeight: 600,
          color: "#999",
        }}
      >
        Works by:
        <div
          onClick={() => {
            setToggle("collection");
          }}
          className={toggle === "collection" ? "" : "clickable"}
          style={{
            fontWeight: 600,
            color: toggle === "collection" ? "black" : "#999",
            textDecoration: toggle === "collection" ? "underline" : "none",
          }}
        >
          Collection
        </div>
        /
        <div
          onClick={() => {
            setToggle("date");
          }}
          className={toggle === "date" ? "" : "clickable"}
          style={{
            fontWeight: 600,
            textDecoration: toggle === "date" ? "underline" : "none",
            color: toggle === "date" ? "black" : "#999",
          }}
        >
          Date
        </div>
      </div>
      <div
        className="mobilePaddingSmall"
        style={{
          padding: "0px 32px",
          marginTop: "32px",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        {toggle === "collection" &&
          collections.map((collection) => (
            <a
              href={`/${encodeURIComponent(collection.route)}`}
              key={`menu-${collection.route}`}
              style={{
                fontWeight: 600,
                textDecoration: "none",
                color: "black",
              }}
              className="clickable mobileStack"
            >
              {collection.title}
              {collection.years && (
                <span style={{ opacity: 0.6, fontWeight: 500 }}>
                  <span className="mobileHide">&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  {collection.years}
                </span>
              )}
            </a>
          ))}
        {toggle === "date" &&
          dates.map((date) => (
            <a
              href={`/${encodeURIComponent(date)}`}
              key={`menu-${date}`}
              style={{
                textDecoration: "none",
                fontWeight: 600,
                color: "black",
              }}
              className="clickable"
            >
              {date}
            </a>
          ))}
      </div>
    </div>
  );
}

export default HomeMenus;
