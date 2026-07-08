import React, { useState, useEffect, useRef } from "react";
import { formatWorkInfoLine } from "./formatWorkDetails.jsx";
import WorkImage from "./WorkImage.jsx";

/**
 * Masonry grid(s) of work thumbnails with a full-screen lightbox
 * (keyboard + touch-swipe navigation). Interactive island.
 *
 * Two ways to feed it:
 *   works    — a flat list rendered as a single grid (collection pages)
 *   sections — [{ id, heading, works }] rendered as anchored sections that
 *              share one continuous lightbox (the /archive page)
 *
 * variant "collection": CSS multi-column masonry.
 * variant "date": CSS grid (source order matches reading order) with captions.
 */
function WorksLightbox({ works, sections, variant = "collection" }) {
  const sectionList = sections ?? [{ id: undefined, heading: undefined, works }];
  const allWorks = sectionList.flatMap((section) => section.works);

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
      setFullScreenIndex(
        (fullScreenIndex + 1 + allWorks.length) % allWorks.length,
      );
    }
    if (touchStart - touchEnd < -50) {
      setFullScreenIndex(
        (fullScreenIndex - 1 + allWorks.length) % allWorks.length,
      );
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
      setFullScreenIndex(
        (fullScreenIndex + 1 + allWorks.length) % allWorks.length,
      );
    } else if (e.key === "ArrowLeft") {
      setFullScreenIndex(
        (fullScreenIndex - 1 + allWorks.length) % allWorks.length,
      );
    }
  };

  let fullScreenLightbox;

  if (fullScreenIndex !== undefined) {
    const fullScreenWorkRecord = allWorks[fullScreenIndex];

    fullScreenLightbox = (
      <div
        onKeyDown={handleKeyDown}
        tabIndex="-1"
        ref={lightboxRef}
        style={{
          touchAction: "none",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0, 0, 0, .8)",
          display: "flex",
          flexDirection: "row",
          flex: 1,
          boxSizing: "border-box",
          height: "100vh",
          padding: "24px 24px 100px 24px",
          gap: 0,
          zIndex: 1000,
          alignItems: "stretch",
          justifyContent: "center",
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
            minWidth: 0,
            minHeight: 0,
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            alt={fullScreenWorkRecord.title || "artwork"}
            loading="eager"
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              width: "auto",
              height: "auto",
              objectFit: "contain",
              display: "block",
            }}
            src={fullScreenWorkRecord.image?.src}
            className="rightArrowOnHover"
            onClick={(e) => {
              e.stopPropagation();
              setFullScreenIndex(
                (fullScreenIndex + 1 + allWorks.length) % allWorks.length,
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

  let indexOffset = 0;

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
        {sectionList.map((section) => {
          const baseIndex = indexOffset;
          indexOffset += section.works.length;
          return (
            <section
              key={section.id ?? "grid"}
              id={section.id}
              className={section.id !== undefined ? "archiveSection" : undefined}
            >
              {section.heading && (
                <div className="archiveSectionHeading">{section.heading}</div>
              )}
              <div
                className={
                  variant === "date"
                    ? "workMasonryGrid workMasonryGrid--datePage"
                    : "workMasonryGrid"
                }
                style={{ maxWidth: "100%" }}
              >
                {section.works.map((work, i) => {
                  const globalIndex = baseIndex + i;
                  return (
                    <div
                      key={`work-${globalIndex}`}
                      className="workMasonryItem clickable"
                      onClick={() => {
                        setFullScreenIndex(globalIndex);
                      }}
                    >
                      <WorkImage
                        className="workImage"
                        alt={work.title || "artwork"}
                        sizes="(max-width: 600px) 100vw, (max-width: 1100px) 50vw, 33vw"
                        image={work.image}
                      />
                      {variant === "date" && work.title && (
                        <div className="workMasonryItemCaption">
                          <div style={{ textAlign: "center" }}>
                            <i>{work.title}</i>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>

      {fullScreenLightbox}
    </>
  );
}

export default WorksLightbox;
