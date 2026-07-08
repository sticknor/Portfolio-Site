import React, { useState, useEffect } from "react";
import { formatWorkInfoLine } from "./formatWorkDetails.jsx";

// A 1x1 transparent gif: matched by the mobile <source> so phones never
// download the splash images (their container is display:none on mobile,
// and the highlights stack shows them instead).
const BLANK_GIF =
  "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";

/**
 * Auto-advancing crossfade carousel for the desktop homepage splash pane.
 * Each slide is a Work record (linked from the About table), shown uncropped
 * (object-fit: contain) with its artwork info captioned underneath.
 * Hydrated only on desktop (client:media) — mobile gets a static stacked list.
 */
function SplashCarousel({ works, interval = 5000 }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || works.length < 2) return undefined;
    const timer = setInterval(
      () => setIndex((i) => (i + 1) % works.length),
      interval,
    );
    return () => clearInterval(timer);
  }, [paused, works.length, interval]);

  return (
    <div
      style={{ position: "relative", width: "100%", height: "100%" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {works.map((work, i) => (
        <div
          key={work.image.src}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            boxSizing: "border-box",
            // Clear the fixed navbar, leave room for the caption below
            padding: "88px 40px 32px 40px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            opacity: i === index ? 1 : 0,
            transition: "opacity 1.2s ease",
          }}
        >
          <picture style={{ flex: 1, minHeight: 0, display: "flex" }}>
            <source media="(max-width: 860px)" srcSet={BLANK_GIF} />
            <source
              media="(min-width: 861px)"
              srcSet={work.image.srcSet}
              sizes="55vw"
            />
            <img
              alt={work.title || `Highlighted artwork ${i + 1} by Sam Ticknor`}
              src={work.image.src}
              width={work.image.width}
              height={work.image.height}
              loading={i === 0 ? "eager" : "lazy"}
              fetchPriority={i === 0 ? "high" : "auto"}
              decoding="async"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                objectPosition: "center",
              }}
            />
          </picture>
          <div style={{ flex: "0 0 auto", fontSize: "14px", lineHeight: 1.5 }}>
            {formatWorkInfoLine(work)}
          </div>
        </div>
      ))}
    </div>
  );
}

export default SplashCarousel;
