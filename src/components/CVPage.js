// React
import React, { useState, useEffect } from "react";

function CVPage({ page, base }) {
  const [recordsByCategory, setRecordsByCategory] = useState({});

  useEffect(() => {
    base("CV")
      .select({ view: "Grid view" })
      .firstPage(function (err, records) {
        if (err) {
          console.error(err);
          return;
        }
        const _recordsByCategory = {};
        records.forEach(function (record) {
          const category = record.get("Category")[0];

          // format record
          let show = record.get("Show on CV");
          let title = record.get("Title");
          let place = record.get("Place");
          let city = record.get("City, State");
          let dates = record.get("Date(s)");
          let subtitle = record.get("Subtitle");
          let description = record.get("Description");
          let link = record.get("Link");
          let linkTitle = record.get("Link Title");
          let recordLine1 = title;
          let recordLine2 = [];
          if (place) recordLine2.push(place);
          if (city) recordLine2.push(city);
          if (dates) recordLine2.push(dates);
          recordLine2 = recordLine2.join(" · ");

          let formattedRecord = {
            show: show,
            line1: recordLine1,
            line2: recordLine2,
            line3: subtitle,
            line4: description,
            link: { title: linkTitle, url: link },
          };

          if (_recordsByCategory[category] === undefined) {
            _recordsByCategory[category] = [formattedRecord];
          } else {
            _recordsByCategory[category] = _recordsByCategory[category].concat([
              formattedRecord,
            ]);
          }
        });
        setRecordsByCategory(_recordsByCategory);
      });
  }, [page.pageTitle]);

  if (recordsByCategory === undefined) return null;
  return (
    <div id={"page"} className="cvpage">
      <div id="scrollContent">
        {Object.keys(recordsByCategory).map((category, index) => {
          return (
            <div
              className="aboutContainer"
              style={{ marginTop: 5 }}
              key={`${category}_${index}`}
            >
              <div className="aboutContainerHeading">{category}</div>
              {recordsByCategory[category].map((record, index) => {
                if (record.show) {
                  return (
                    <div style={{ marginBottom: 15 }}>
                      <div>{record.line1}</div>
                      <div style={{ fontSize: 14, opacity: 0.5 }}>
                        {record.line2}
                      </div>
                      <div style={{ fontSize: 14, opacity: 0.5 }}>
                        {record.line3}
                      </div>
                      <div style={{ fontSize: 14, opacity: 0.5 }}>
                        {record.line4}
                      </div>
                      <a
                        style={{ fontSize: 14, opacity: 0.5 }}
                        target="_blank"
                        href={record.link.url}
                      >
                        {record.link.title}
                      </a>
                    </div>
                  );
                }
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CVPage;
