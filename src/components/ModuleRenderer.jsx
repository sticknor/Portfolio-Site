import React from "react";
import { formatWorkInfoLine } from "./formatWorkDetails.jsx";
import WorkImage from "./WorkImage.jsx";

/**
 * Static renderers for the installation page module system.
 * Rendered at build time (no client directive) — zero JS shipped.
 */

function ImageOnlyModule({ module, widthPercent }) {
  const work = module.moduleWorks[0];
  if (!work) return null;
  return (
    <div
      className={`pageModule${widthPercent === 100 ? " imageFullModule" : ""}`}
    >
      <WorkImage
        className="workImage"
        style={{ width: `${widthPercent}%`, height: "auto" }}
        image={work.image}
        alt={work.title || "artwork"}
        sizes={`(max-width: 1100px) 90vw, ${widthPercent}vw`}
      />
      {module.showWorkTitlesWithinModule && formatWorkInfoLine(work)}
      {module.moduleTitle && <div className="workText">{module.moduleTitle}</div>}
      {module.moduleText && <div className="workText">{module.moduleText}</div>}
    </div>
  );
}

function ImageWithTextModule({ module, textFirst = false }) {
  const work = module.moduleWorks[0];
  if (!work) return null;

  const image = (
    <div
      key="image"
      style={{
        display: "flex",
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <WorkImage
        className="workImage"
        style={{ width: "100%", height: "auto" }}
        image={work.image}
        alt={work.title || "artwork"}
        sizes="(max-width: 1100px) 90vw, 40vw"
      />
      {module.showWorkTitlesWithinModule && formatWorkInfoLine(work)}
    </div>
  );

  const text = (
    <div
      key="text"
      className="imageWithTextModuleText"
      style={{
        display: "flex",
        fontSize: 18,
        flex: 1,
        flexDirection: "column",
        whiteSpace: "pre-wrap",
        ...(textFirst ? { textAlign: "left", alignItems: "flex-end" } : {}),
      }}
    >
      {module.moduleTitle && <div className="workText">{module.moduleTitle}</div>}
      {module.moduleText && <div className="workText">{module.moduleText}</div>}
    </div>
  );

  return (
    <div
      className={`pageModule ${
        textFirst ? "textWithImageModule" : "imageWithTextModule"
      } mobileStack`}
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 50,
      }}
    >
      {textFirst ? [text, image] : [image, text]}
    </div>
  );
}

function TextModule({ module }) {
  return (
    <div
      className="pageModule textModule"
      style={{
        flexDirection: "row",
        alignItems: "flex-start",
        gap: 50,
      }}
    >
      {module.moduleTitle && (
        <div style={{ fontSize: 18 }}>{module.moduleTitle}</div>
      )}
      {module.moduleText && (
        <div style={{ maxWidth: "70%", fontSize: 18, whiteSpace: "pre-wrap" }}>
          {module.moduleText}
        </div>
      )}
    </div>
  );
}

function LinkModule({ module }) {
  return (
    <div
      className="pageModule linkModule"
      style={{
        flexDirection: "row",
        alignItems: "flex-start",
        gap: 50,
        marginBottom: 10,
      }}
    >
      {module.moduleTitle && (
        <a
          href={module.moduleText}
          style={{ fontSize: 18 }}
          target="_blank"
          rel="noreferrer"
        >
          {module.moduleTitle}
        </a>
      )}
    </div>
  );
}

function CarouselModule({ module }) {
  const works = module.moduleWorks;
  return (
    <div className="pageModule carouselModule">
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          overflowX: "scroll",
          maxWidth: "100%",
          gap: 50,
          justifyContent: "space-between",
        }}
      >
        {works.map((w, i) => (
          <div
            key={`carousel-${i}`}
            style={{
              display: "flex",
              minWidth: "60%",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <WorkImage
              className="workImage"
              image={w.image}
              alt={w.title || "artwork"}
              sizes="60vw"
              style={{ maxHeight: "70vh", width: "100%", minHeight: "50vh" }}
            />
            {module.showWorkTitlesWithinModule && formatWorkInfoLine(w)}
          </div>
        ))}
      </div>
      {module.moduleTitle && <div className="workText">{module.moduleTitle}</div>}
      {module.moduleText && <div className="workText">{module.moduleText}</div>}
    </div>
  );
}

function CascadeModule({ module, direction }) {
  const works = module.moduleWorks;
  const imageWidth = 100 / works.length - 5;

  return (
    <div className="pageModule cascadeModule">
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "flex-start",
        }}
      >
        {works.map((w, i) => (
          <div
            key={`cascade-${i}`}
            className="cascadeElement"
            style={{
              display: "flex",
              width: `${imageWidth}%`,
              marginTop:
                imageWidth *
                4 *
                (direction === "left" ? works.length - 1 - i : i),
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <WorkImage
              className="workImage"
              image={w.image}
              alt={w.title || "artwork"}
              sizes={`(max-width: 1100px) 90vw, ${Math.round(imageWidth)}vw`}
            />
            {module.showWorkTitlesWithinModule && formatWorkInfoLine(w)}
          </div>
        ))}
      </div>
      {module.moduleTitle && <div className="workText">{module.moduleTitle}</div>}
      {module.moduleText && <div className="workText">{module.moduleText}</div>}
    </div>
  );
}

function GridModule({ module }) {
  const works = module.moduleWorks;

  return (
    <div className="pageModule gridModule">
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          maxWidth: "100%",
          gap: 50,
          justifyContent: "space-between",
        }}
      >
        {works.map((w, i) => (
          <div
            key={`grid-${i}`}
            className="gridElement"
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <WorkImage
              className="workImage"
              image={w.image}
              alt={w.title || "artwork"}
              sizes={`(max-width: 1100px) 90vw, ${Math.round(
                100 / works.length,
              )}vw`}
              style={{ width: "100%" }}
            />
            {module.showWorkTitlesWithinModule && formatWorkInfoLine(w)}
          </div>
        ))}
      </div>
      {module.moduleTitle && <div className="workText">{module.moduleTitle}</div>}
      {module.moduleText && <div className="workText">{module.moduleText}</div>}
    </div>
  );
}

function VideoModule({ module }) {
  const work = module.moduleWorks[0];
  if (!work) return null;
  return (
    <div className="pageModule">
      <div
        className="video"
        style={{
          position: "relative",
          width: "100%",
          height: 0,
          paddingBottom: "56.25%",
        }}
      >
        <iframe
          title={module.moduleTitle || "video"}
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            width: "100%",
            height: "100%",
          }}
          src={`${work.videoLink}?autoplay=1&mute=1`}
          frameBorder="0"
          allow="autoplay"
          allowFullScreen
        ></iframe>
      </div>
      {module.showWorkTitlesWithinModule && formatWorkInfoLine(work)}
      {module.moduleTitle && <div className="workText">{module.moduleTitle}</div>}
      {module.moduleText && <div className="workText">{module.moduleText}</div>}
    </div>
  );
}

function ModuleRenderer({ modules }) {
  return (
    <>
      {modules.map((module, index) => {
        const key = `${module.moduleTitle || module.moduleType}-${index}`;
        switch (module.moduleType) {
          case "Image Full":
            return <ImageOnlyModule key={key} module={module} widthPercent={100} />;
          case "Image Three Quarter":
            return <ImageOnlyModule key={key} module={module} widthPercent={75} />;
          case "Image Half":
            return <ImageOnlyModule key={key} module={module} widthPercent={50} />;
          case "Carousel":
            return <CarouselModule key={key} module={module} />;
          case "Image With Text":
            return <ImageWithTextModule key={key} module={module} />;
          case "Text With Image":
            return <ImageWithTextModule key={key} module={module} textFirst />;
          case "Text":
            return <TextModule key={key} module={module} />;
          case "Link":
            return <LinkModule key={key} module={module} />;
          case "Cascade Left":
            return <CascadeModule key={key} module={module} direction="left" />;
          case "Cascade Right":
            return <CascadeModule key={key} module={module} direction="right" />;
          case "Video":
            return <VideoModule key={key} module={module} />;
          case "Grid":
            return <GridModule key={key} module={module} />;
          default:
            return null;
        }
      })}
    </>
  );
}

export default ModuleRenderer;
