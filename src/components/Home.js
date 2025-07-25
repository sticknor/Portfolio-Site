// React
import React, { useState } from "react";
import { Link } from "react-router-dom";

function Home({
  splashImages,
  collections,
  dateCollections,
  installations,
  loadingStates,
}) {
  const [toggle, setToggle] = useState("collection");

  // Skeleton loading component for menu items
  const SkeletonMenuItem = () => (
    <div
      style={{
        height: "24px",
        backgroundColor: "#f0f0f0",
        borderRadius: "4px",
        animation: "pulse 1.5s ease-in-out infinite alternate",
        marginBottom: "24px",
        width: "60%",
      }}
    />
  );

  // Skeleton loading component for installation cards
  const SkeletonInstallation = () => (
    <div
      style={{
        width: "230px",
        aspectRatio: "3/2",
        backgroundColor: "#f0f0f0",
        borderRadius: "8px",
        animation: "pulse 1.5s ease-in-out infinite alternate",
      }}
      className="mobileFullWidth"
    />
  );

  return (
    <div>
      {/* Add CSS animation for skeleton loading */}
      <style>{`
        @keyframes pulse {
          0% { opacity: 1; }
          100% { opacity: 0.5; }
        }
      `}</style>

      {/* Splash Image on Right */}
      {splashImages && splashImages[0] && (
        <div
          className="mobileHide"
          style={{
            position: "fixed",
            top: "0px",
            right: "0px",
            bottom: "0px",
            width: "40vw",
            zIndex: 200,
          }}
        >
          <img
            alt="A splashy introduction to the artwork of Sam Ticknor"
            src={splashImages[0].url}
            loading="lazy"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "top center",
            }}
          ></img>
        </div>
      )}

      {/* Menus on Left */}
      <div style={{ width: "60vw" }} className="mobileFullWidth">
        <div
          className="mobilePadding"
          style={{
            marginTop: "64px",
            gap: "64px",
            padding: "64px",
            paddingTop: "32px",
            display: "flex",
            flex: 1,
            flexDirection: "column",
          }}
        >
          {/* Collections Menu */}
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
                  textDecoration:
                    toggle === "collection" ? "underline" : "none",
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
              {toggle === "collection" && (
                <>
                  {loadingStates?.collections ? (
                    // Show skeleton loading for collections
                    <>
                      <SkeletonMenuItem />
                      <SkeletonMenuItem />
                      <SkeletonMenuItem />
                    </>
                  ) : (
                    // Show actual collections once loaded
                    collections.map((collection, index) => {
                      if (!collection.showInMenu) return null;
                      return (
                        <Link
                          to={collection.route}
                          key={`menu-${collection.route}`}
                          style={{
                            fontWeight: 600,
                            textDecoration: "none",
                            color: "black",
                          }}
                          className="clickable mobileStack"
                        >
                          <>
                            {collection.title}
                            {collection.years && (
                              <span style={{ opacity: 0.6, fontWeight: 500 }}>
                                <span className="mobileHide">
                                  &nbsp;&nbsp;&nbsp;&nbsp;
                                </span>
                                {collection.years}
                              </span>
                            )}
                          </>
                        </Link>
                      );
                    })
                  )}
                </>
              )}
              {toggle === "date" && (
                <>
                  {loadingStates?.works ? (
                    // Show skeleton loading for date collections
                    <>
                      <SkeletonMenuItem />
                      <SkeletonMenuItem />
                      <SkeletonMenuItem />
                      <SkeletonMenuItem />
                    </>
                  ) : (
                    // Show actual date collections once loaded
                    Object.keys(dateCollections)
                      .sort()
                      .reverse()
                      .map((dateCollectionID, index) => {
                        return (
                          <Link
                            to={dateCollectionID}
                            key={`menu-${dateCollectionID}`}
                            style={{
                              textDecoration: "none",
                              fontWeight: 600,
                              color: "black",
                            }}
                            className="clickable"
                          >
                            {dateCollectionID}
                          </Link>
                        );
                      })
                  )}
                </>
              )}
            </div>
          </div>
          {/* Installations Menu */}
          <div>
            <span
              style={{
                display: "flex",
                flexDirection: "row",
                fontWeight: 600,
                marginBottom: "32px",
                color: "#999",
              }}
            >
              Installations:
            </span>
            <div
              style={{
                display: "flex",
                flex: 1,
                alignItems: "space-between",
                flexDirection: "row",
                gap: 32,
                flexWrap: "wrap",
                maxWidth: "786px",
              }}
            >
              {loadingStates?.installations ? (
                // Show skeleton loading for installations
                <>
                  <SkeletonInstallation />
                  <SkeletonInstallation />
                  <SkeletonInstallation />
                </>
              ) : (
                // Show actual installations once loaded
                installations.map((installation) => {
                  if (installation.showInMenu) {
                    return (
                      <Link
                        style={{
                          width: "230px",
                          aspectRatio: "3/2",
                          position: "relative",
                          textDecoration: "none",
                        }}
                        to={installation.route}
                        key={`menu-${installation.route}`}
                        className="mobileFullWidth"
                      >
                        <img
                          alt="Installation Preview"
                          loading="lazy"
                          style={{
                            position: "absolute",
                            top: "0px",
                            bottom: "0px",
                            left: "0px",
                            right: "0px",
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                          src={installation.imageLink}
                        />
                        <div
                          style={{
                            position: "absolute",
                            top: "0px",
                            bottom: "0px",
                            left: "0px",
                            right: "0px",
                            width: "100%",
                            height: "100%",
                            background:
                              "linear-gradient(to right, rgba(0, 0, 0, .8), rgba(0, 0, 0, .1))",
                          }}
                        />
                        <div
                          style={{
                            display: "flex",
                            flex: 1,
                            flexDirection: "column",
                            height: "100%",
                          }}
                          className="clickable"
                        >
                          <div
                            style={{
                              color: "white",
                              zIndex: 2,
                              padding: "16px 16px 16px 16px",
                              lineHeight: 1.5,
                              display: "flex",
                              flex: 1,
                              flexDirection: "column",
                              justifyContent: "space-between",
                              gap: "8px",
                            }}
                          >
                            <div style={{ fontWeight: 600 }}>
                              {installation.title}
                            </div>
                            <div>
                              {installation.location && (
                                <div>{installation.location}</div>
                              )}
                              {installation.dates && (
                                <div>{installation.dates}</div>
                              )}
                            </div>
                          </div>
                        </div>
                      </Link>
                    );
                  }
                  return null;
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
