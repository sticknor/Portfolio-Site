import React, { useState, useEffect, useRef } from "react";
import { formatWorkInfoLine } from "./formatWorkDetails.jsx";
import WorkImage from "./WorkImage.jsx";

/**
 * Grid of work thumbnails with a full-screen lightbox
 * (keyboard + touch-swipe navigation). Interactive island.
 */
function WorksLightbox({ works, centered = false }) {
  const [fullScreenIndex, setFullScreenIndex] = useState(undefined);
  const lightboxRef = useRef(null);

  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  function handleTouchMove(e) {
    setTouchEnd(e.targetTouches[0].clientX);
  }

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      setFullScreenIndex((fullScreenIndex + 1 + works.length) % works.length);
    }
    if (touchStart - touchEnd < -50) {
      setFullScreenIndex((fullScreenIndex - 1 + works.length) % works.length);
    }
  };

  useEffect(() => {
    if (fullScreenIndex !== undefined && lightboxRef.current) {
      lightboxRef.current.focus();
    }
  }, [fullScreenIndex]);

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setFullScreenIndex(undefined);
    } else if (e.key === " " || e.key === "ArrowRight") {
      e.preventDefault();
      setFullScreenIndex((fullScreenIndex + 1 + works.length) % works.length);
    } else if (e.key === "ArrowLeft") {
      setFullScreenIndex((fullScreenIndex - 1 + works.length) % works.length);
    }
  };

  let fullScreenLightbox;

  if (fullScreenIndex !== undefined) {
    const fullScreenWorkRecord = works[fullScreenIndex];

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
            alt={fullScreenWorkRecord.title || "artwork"}
            style={{
              width: "auto",
              height: "100%",
              maxHeight: "90vh",
              maxWidth: "100%",
              objectFit: "contain",
            }}
            src={fullScreenWorkRecord.image?.src}
            className="rightArrowOnHover"
            onClick={(e) => {
              e.stopPropagation();
              setFullScreenIndex(
                (fullScreenIndex + 1 + works.length) % works.length,
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
    <>
      <div
        style={{
          display: "flex",
          direction: "row",
          flexWrap: "wrap",
          maxWidth: "100%",
          gap: "32px",
          ...(centered
            ? { alignItems: "center", justifyContent: "center" }
            : {}),
        }}
      >
        {works.map((work, i) => {
          return (
            <div
              key={`work-${i}`}
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
              <WorkImage
                className="mobileLightboxInnerImage"
                alt={work.title || "artwork"}
                sizes="(max-width: 860px) 100vw, 300px"
                image={work.image}
                style={{
                  width: "300px",
                  height: "300px",
                  marginLeft: "-50px",
                  marginTop: "-50px",
                  objectFit: "cover",
                }}
              />
            </div>
          );
        })}
      </div>

      {fullScreenLightbox}
    </>
  );
}

export default WorksLightbox;
