import React, { useState, useEffect } from "react";

// A 1x1 transparent gif: matched by the mobile <source> so phones never
// download the splash images (their container is display:none on mobile,
// and the highlights stack shows them instead).
const BLANK_GIF =
  "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";

/**
 * Auto-advancing crossfade carousel for the desktop homepage splash pane.
 * Works are shown uncropped (object-fit: contain) against the page background.
 * Hydrated only on desktop (client:media) — mobile gets a static stacked list.
 */
function SplashCarousel({ images, interval = 5000 }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || images.length < 2) return undefined;
    const timer = setInterval(
      () => setIndex((i) => (i + 1) % images.length),
      interval,
    );
    return () => clearInterval(timer);
  }, [paused, images.length, interval]);

  return (
    <div
      style={{ position: "relative", width: "100%", height: "100%" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {images.map((image, i) => (
        <picture key={image.src}>
          <source media="(max-width: 860px)" srcSet={BLANK_GIF} />
          <source
            media="(min-width: 861px)"
            srcSet={image.srcSet}
            sizes="55vw"
          />
          <img
            alt={`Highlighted artwork ${i + 1} by Sam Ticknor`}
            src={image.src}
            width={image.width}
            height={image.height}
            loading={i === 0 ? "eager" : "lazy"}
            fetchpriority={i === 0 ? "high" : "auto"}
            decoding="async"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              boxSizing: "border-box",
              // Clear the fixed navbar, breathe at the edges
              padding: "88px 40px 40px 40px",
              objectFit: "contain",
              objectPosition: "center",
              opacity: i === index ? 1 : 0,
              transition: "opacity 1.2s ease",
            }}
          />
        </picture>
      ))}
    </div>
  );
}

export default SplashCarousel;
