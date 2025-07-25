// React
import React from "react";
import { formatWorkInfoLine } from "./formatWorkDetails";

function CarouselModule({ module, base }) {
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
        {works.map((w) => (
          <div
            style={{
              display: "flex",
              minWidth: "60%",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              alt="artwork"
              className="workImage"
              src={w.imageLink}
              style={{ maxHeight: "70vh", width: "100%", minHeight: "50vh" }}
            />
            {module.showWorkTitlesWithinModule && formatWorkInfoLine(w)}
          </div>
        ))}
      </div>
      {module.moduleTitle && <div class="workText">{module.moduleTitle}</div>}
      {module.moduleText && <div class="workText">{module.moduleText}</div>}
    </div>
  );
}

export default CarouselModule;
