// React
import React, { useState, useEffect } from "react";
import { InstagramEmbed } from "react-social-media-embed";

function InstagramEmbedPage({ page, base }) {
  const [imagesToEmbed, setImagesToEmbed] = useState([]);

  useEffect(() => {
    base(page.pageTitle)
      .select({ view: "Grid view" })
      .firstPage(function (err, records) {
        if (err) {
          console.error(err);
          return;
        }
        const _imagesToEmbed = [];
        records.forEach(function (record) {
          _imagesToEmbed.push(record.get("InstagramID"));
        });
        setImagesToEmbed(_imagesToEmbed);
      });
  }, [page.pageTitle]);

  return (
    <div id={"page"}>
      <div id="scrollContent">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          {imagesToEmbed.map((instagramID, index) => {
            return (
              <div
                style={{
                  width: 500,
                  maxWidth: "100%",
                  overflow: "hidden",
                  marginBottom: 20,
                }}
              >
                <InstagramEmbed
                  url={`https://www.instagram.com/p/${instagramID}/`}
                  width={"100%"}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default InstagramEmbedPage;
