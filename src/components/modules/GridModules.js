// React
import React from "react";
import { formatWorkInfoLine } from "./formatWorkDetails";

function GridModule({ module, base }) {
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
        {works.map((w) => (
          <div
            className="gridElement"
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              alt="artwork"
              className="workImage"
              src={w.imageLink}
              style={{ width: "100%" }}
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

export { GridModule };
