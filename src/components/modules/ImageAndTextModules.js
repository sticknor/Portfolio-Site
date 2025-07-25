// React
import React from "react";
import { formatWorkInfoLine } from "./formatWorkDetails";

function ImageWithTextModule({ module }) {
  if (module.moduleWorks.length === 0) {
    return null;
  }
  const work = module.moduleWorks[0];
  if (!work) {
    return null;
  }

  return (
    <div
      className="pageModule imageWithTextModule mobileStack"
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 50,
      }}
    >
      <div
        style={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img
          alt="artwork"
          className="workImage"
          style={{ width: "100%", height: "auto" }}
          src={work.imageLink}
        />
        {module.showWorkTitlesWithinModule && formatWorkInfoLine(work)}
      </div>
      <div
        className="imageWithTextModuleText"
        style={{
          display: "flex",
          fontSize: 18,
          flex: 1,
          flexDirection: "column",
          whiteSpace: "pre-wrap",
        }}
      >
        {module.moduleTitle && <div class="workText">{module.moduleTitle}</div>}
        {module.moduleText && <div class="workText">{module.moduleText}</div>}
      </div>
    </div>
  );
}

function TextWithImageModule({ module }) {
  if (module.moduleWorks.length === 0) {
    return null;
  }
  const work = module.moduleWorks[0];
  if (!work) {
    return null;
  }
  return (
    <div
      className="pageModule textWithImageModule mobileStack"
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 50,
      }}
    >
      <div
        style={{
          flex: 1,
          fontSize: 18,
          display: "flex",
          flexDirection: "column",
          textAlign: "left",
          alignItems: "flex-end",
          whiteSpace: "pre-wrap",
        }}
        className="imageWithTextModuleText"
      >
        {module.moduleTitle && <div class="workText">{module.moduleTitle}</div>}
        {module.moduleText && <div class="workText">{module.moduleText}</div>}
      </div>
      <div
        style={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img
          alt="artwork"
          className="workImage"
          style={{ width: "100%", height: "auto" }}
          src={work.imageLink}
        />
        {module.showWorkTitlesWithinModule && formatWorkInfoLine(work)}
      </div>
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
        <a href={module.moduleText} style={{ fontSize: 18 }} target="_blank">
          {module.moduleTitle}
        </a>
      )}
    </div>
  );
}

export { ImageWithTextModule, TextWithImageModule, TextModule, LinkModule };
