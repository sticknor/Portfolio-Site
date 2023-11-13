// React
import React, { useState, useEffect } from "react";
import {
  ImageFullModule,
  ImageThreeQuarterModule,
  ImageHalfModule,
} from "./modules/ImageOnlyModules";
import {
  ImageWithTextModule,
  TextWithImageModule,
  TextModule,
  LinkModule,
} from "./modules/ImageAndTextModules";
import CarouselModule from "./modules/CarouselModule";
import {
  CascadeLeftModule,
  CascadeRightModule,
} from "./modules/CascadeModules";
import { GridModule } from "./modules/GridModules";
import { VideoModule } from "./modules/VideoModules";

function Page({ page, base }) {
  const [modules, setModules] = useState([]);

  useEffect(() => {
    setModules([]);
    if (document.querySelector("#scrollContent")) {
      document.querySelector("#page").scrollTop = 0;
    }
    base(page.pageTitle)
      .select({ view: "Grid view" })
      .firstPage(function (err, records) {
        if (err) {
          console.error(err);
          return;
        }
        const _modules = [];
        records.forEach(function (record) {
          _modules.push({
            moduleType: record.get("Module Type"),
            moduleWorks: record.get("Module Work(s)"),
            moduleTitle: record.get("Module Title"),
            moduleText: record.get("Module Text"),
            showWorkTitlesWithinModule: record.get(
              "Show Work Titles Within Module"
            ),
          });
        });
        setModules(_modules);
      });
  }, [page.pageTitle]);

  return (
    <div id={"page"}>
      <div id="scrollContent">
        {modules.map((module, index) => {
          if (module.moduleType === "Image Full") {
            return (
              <ImageFullModule
                key={module.moduleTitle}
                module={module}
                base={base}
              />
            );
          } else if (module.moduleType === "Image Three Quarter") {
            return (
              <ImageThreeQuarterModule
                key={module.moduleTitle}
                module={module}
                base={base}
              />
            );
          } else if (module.moduleType === "Image Half") {
            return (
              <ImageHalfModule
                key={module.moduleTitle}
                module={module}
                base={base}
              />
            );
          } else if (module.moduleType === "Carousel") {
            return (
              <CarouselModule
                key={module.moduleTitle}
                module={module}
                base={base}
              />
            );
          } else if (module.moduleType === "Image With Text") {
            return (
              <ImageWithTextModule
                key={module.moduleTitle}
                module={module}
                base={base}
              />
            );
          } else if (module.moduleType === "Text With Image") {
            return (
              <TextWithImageModule
                key={module.moduleTitle}
                module={module}
                base={base}
              />
            );
          } else if (module.moduleType === "Text") {
            return (
              <TextModule
                key={module.moduleTitle}
                module={module}
                base={base}
              />
            );
          } else if (module.moduleType === "Link") {
            return (
              <LinkModule
                key={module.moduleTitle}
                module={module}
                base={base}
              />
            );
          } else if (module.moduleType === "Cascade Left") {
            return (
              <CascadeLeftModule
                key={module.moduleTitle}
                module={module}
                base={base}
              />
            );
          } else if (module.moduleType === "Cascade Right") {
            return (
              <CascadeRightModule
                key={module.moduleTitle}
                module={module}
                base={base}
              />
            );
          } else if (module.moduleType === "Video") {
            return (
              <VideoModule
                key={module.moduleTitle}
                module={module}
                base={base}
              />
            );
          } else if (module.moduleType === "Grid") {
            return (
              <GridModule
                key={module.moduleTitle}
                module={module}
                base={base}
              />
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}

export default Page;
