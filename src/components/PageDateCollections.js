// React
import React, { useState, useEffect, createRef } from "react";
import { formatWorkInfoLine } from "./modules/formatWorkDetails";
import { Link } from "react-router-dom";

function PageDateCollections({ works, date, allWorksById, dateCollections }) {
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
    if (Object.keys(allWorksById).length === 0) return;
    else {
      setIsLoading(true);
      setCollectionWorks([]); // Clear the grid immediately when switching years
      setFullScreenIndex(undefined); // Close any open lightbox when switching years
      let _collectionWorks = [];
      works.forEach(function (workId) {
        let workRecord = allWorksById[workId];
        _collectionWorks.push(workRecord);
      });
      setCollectionWorks([..._collectionWorks]);
      setIsLoading(false);
    }
  }, [allWorksById, date]);

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

  // Remove the early return for loading to show year navigation during transitions

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
    <div
      style={{
        marginTop: "64px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "64px",
          flex: 1,
          gap: "64px",
        }}
        className="mobileStack mobilePadding mobileGap"
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
            gap: "64px",
          }}
          className="mobileStack mobilePadding mobileGap"
        >
          {Object.keys(dateCollections)
            .sort()
            .map((dateCollectionID, index) => {
              return (
                <Link
                  to={`/${dateCollectionID}`}
                  key={`menu-${dateCollectionID}`}
                  style={{
                    textDecoration: "none",
                    color: "black",
                    fontWeight: dateCollectionID === date ? 600 : 400,
                    textDecoration:
                      dateCollectionID === date ? "underline" : "none",
                  }}
                  className={dateCollectionID === date ? "" : "clickable"}
                >
                  {dateCollectionID}
                </Link>
              );
            })}
        </div>
        {collectionWorks.length > 0 && (
          <div
            style={{
              display: "flex",
              direction: "row",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
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
        )}
      </div>

      {fullScreenLightbox}
    </div>
  );
}

export default PageDateCollections;
