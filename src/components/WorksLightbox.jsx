import React, { useState, useEffect, useRef } from "react";
import {
  formatWorkAltText,
  formatWorkLightboxCaption,
} from "./formatWorkDetails.jsx";
import WorkImage from "./WorkImage.jsx";

/**
 * Fixed CSS-grid of work thumbnails with a full-screen lightbox
 * (keyboard + touch-swipe navigation). Interactive island.
 *
 * Two ways to feed it:
 *   works    — a flat list rendered as a single grid (collection pages)
 *   sections — [{ id, heading, works }] rendered as anchored sections that
 *              share one continuous lightbox (the /archive page)
 */
function WorksLightbox({ works, sections }) {
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
        className="workLightbox"
        onClick={() => {
          setFullScreenIndex(undefined);
        }}
      >
        <button
          type="button"
          className="workLightboxClose clickable"
          aria-label="Close"
          onClick={(e) => {
            e.stopPropagation();
            setFullScreenIndex(undefined);
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M6 6l12 12M18 6L6 18"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
        <div
          className="workLightboxImagePane"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onTouchMove={handleTouchMove}
        >
          <img
            alt={formatWorkAltText(fullScreenWorkRecord)}
            loading="eager"
            className="workLightboxImage rightArrowOnHover"
            src={fullScreenWorkRecord.image?.src}
            onClick={(e) => {
              e.stopPropagation();
              setFullScreenIndex(
                (fullScreenIndex + 1 + allWorks.length) % allWorks.length,
              );
            }}
          />
        </div>
        {formatWorkLightboxCaption(fullScreenWorkRecord) && (
          <div
            className="workLightboxCaption"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {formatWorkLightboxCaption(fullScreenWorkRecord)}
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
              <div className="work-grid">
                {section.works.map((work, i) => {
                  const globalIndex = baseIndex + i;
                  return (
                    <figure
                      key={`work-${globalIndex}`}
                      className="work clickable"
                      onClick={() => {
                        setFullScreenIndex(globalIndex);
                      }}
                    >
                      <div className="work__image">
                        <WorkImage
                          className="workImage"
                          work={work}
                          sizes="(max-width: 600px) 100vw, (max-width: 1100px) 50vw, 33vw"
                          image={work.image}
                        />
                      </div>
                    </figure>
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
