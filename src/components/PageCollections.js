// React
import React, { useState, useEffect, createRef } from "react";
import { formatWorkInfoLine } from "./modules/formatWorkDetails";

function PageCollections({ collection, base, allWorksById }) {
  const [collectionWorks, setCollectionWorks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fullScreenIndex, setFullScreenIndex] = useState(undefined);
  const lightboxRef = createRef();

  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  function handleTouchMove(e) {
    setTouchEnd(e.targetTouches[0].clientX);
  }

  const handleTouchEnd = (e) => {
    if (touchStart - touchEnd > 50) {
      // do your stuff here for left swipe

      setFullScreenIndex(
        (fullScreenIndex + 1 + collectionWorks.length) % collectionWorks.length
      );
    }

    if (touchStart - touchEnd < -50) {
      // do your stuff here for right swipe
      setFullScreenIndex(
        (fullScreenIndex - 1 + collectionWorks.length) % collectionWorks.length
      );
    }
  };

  useEffect(() => {
    if (Object.keys(allWorksById).length === 0) setIsLoading(true);
    else {
      const tableName = collection.route;
      base(tableName)
        .select({ view: "Grid view" })
        .firstPage(function (err, records) {
          if (err) {
            console.error(err);
            return;
          }
          let _collectionWorks = [];
          records.forEach(function (record) {
            let workId = record.get("Work")[0];
            let workRecord = allWorksById[workId];
            _collectionWorks.push(workRecord);
          });
          setCollectionWorks([..._collectionWorks]);
          setIsLoading(false);
        });
    }
  }, [allWorksById]);

  useEffect(() => {
    if (fullScreenIndex !== undefined) {
      lightboxRef.current.focus();
    }
  }, [fullScreenIndex, lightboxRef]);

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setFullScreenIndex(undefined);
    } else if (e.key === " " || e.key === "ArrowRight") {
      e.preventDefault();
      setFullScreenIndex(
        (fullScreenIndex + 1 + collectionWorks.length) % collectionWorks.length
      );
    } else if (e.key === "ArrowLeft") {
      setFullScreenIndex(
        (fullScreenIndex - 1 + collectionWorks.length) % collectionWorks.length
      );
    }
  };

  if (isLoading) return null;

  let fullScreenLightbox;

  if (fullScreenIndex !== undefined) {
    // Show full screen record
    let fullScreenWorkRecord = collectionWorks[fullScreenIndex];

    fullScreenLightbox = (
      <div
        onKeyDown={handleKeyDown}
        tabIndex="-1"
        ref={lightboxRef}
        style={{
          touchAction: "none",
          position: "fixed",
          top: "0px",
          left: "0px",
          right: "0px",
          bottom: "0px",
          background: "rgba(0, 0, 0, .8)",
          display: "flex",
          flexDirection: "row",
          flex: 1,
          padding: "64px",
          gap: "64px",
          zIndex: 1000,
          alignItems: "center",
        }}
        className="upArrowOnHover mobilePaddingSmall"
        onClick={() => {
          setFullScreenIndex(undefined);
        }}
      >
        <div
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onTouchMove={handleTouchMove}
          style={{
            display: "flex",
            flex: 1,
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            alt="artwork"
            style={{
              width: "auto",
              height: "100%",
              maxHeight: "90vh",
              maxWidth: "100%",
              objectFit: "contain",
            }}
            src={fullScreenWorkRecord.imageLink}
            className="rightArrowOnHover"
            onClick={(e) => {
              e.stopPropagation();
              setFullScreenIndex(
                (fullScreenIndex + 1 + collectionWorks.length) %
                  collectionWorks.length
              );
            }}
          />
        </div>
        {(fullScreenWorkRecord.title ||
          fullScreenWorkRecord.medium ||
          fullScreenWorkRecord.year) && (
          <div
            style={{
              background:
                "linear-gradient(90deg,rgba(255, 255, 240, 1) 0%,rgba(246, 254, 255, 1) 100%)",
              textAlign: "left",
              padding: "32px",
              cursor: "default",
              position: "fixed",
              bottom: "0px",
              right: "0px",
            }}
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="mobilePaddingSmall"
          >
            {formatWorkInfoLine(fullScreenWorkRecord)}
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={{ marginTop: "64px", backgroundColor: "#fff" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          padding: "64px",
          flex: 1,
          gap: "64px",
        }}
        className="mobileStack mobilePadding mobileGap"
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "space-between",
            flexDirection: "column",
          }}
        >
          <div>
            <div style={{ fontWeight: 600, marginBottom: 8 }}>
              {collection.title}
              <div style={{ opacity: 0.6, fontWeight: 500 }}>
                {" — "}
                {collection.years}
              </div>
            </div>
            {collection.collectionStatement && (
              <div
                style={{
                  paddingTop: 24,
                  paddingBottom: 0,
                  whiteSpace: "pre-wrap",
                }}
              >
                {collection.collectionStatement}
              </div>
            )}
          </div>
        </div>
        <div
          style={{
            height: "100%",
            flex: 2,
            display: "flex",
            overflow: "auto",
            WebkitOverflowScrolling: "touch",
          }}
        >
          <div
            style={{
              display: "flex",
              direction: "row",
              flexWrap: "wrap",
              maxWidth: "100%",
              gap: "32px",
            }}
          >
            {collectionWorks.map((work, i) => {
              return (
                <div
                  className="mobileLightboxOuterImage clickable"
                  style={{
                    width: "200px",
                    height: "200px",
                    overflow: "hidden",
                  }}
                  onClick={() => {
                    setFullScreenIndex(i);
                  }}
                >
                  <img
                    className="mobileLightboxInnerImage"
                    alt="artwork"
                    style={{
                      width: "300px",
                      height: "300px",
                      marginLeft: "-50px",
                      marginTop: "-50px",
                      objectFit: "cover",
                    }}
                    src={work.imageLink}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {fullScreenLightbox}
    </div>
  );
}

export default PageCollections;
