// React
import React, { useState, useEffect } from "react";

function AboutPage({ page, base }) {
  const [bio, setBio] = useState("");
  const [bioImage, setBioImage] = useState([]);
  const [showCVLink, setShowCVLink] = useState(false);

  useEffect(() => {
    base("About")
      .select({ view: "Grid view" })
      .firstPage(function (err, records) {
        if (err) {
          console.error(err);
          return;
        }
        let _bio;
        let _bioImage;
        records.forEach(function (record) {
          _bioImage = record.get("Bio Image");
          _bio = record.get("Bio");
          setBio(_bio);
          setBioImage(_bioImage);
          setShowCVLink(record.get("Show CV"));
        });
      });
  }, [page.pageTitle]);

  return (
    <div id={"page"}>
      <div id="scrollContent">
        <div
          className="pageModule imageWithTextModule"
          style={{
            flexDirection: "row",
            gap: 50,
            alignItems: "flex-start",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flex: 0.5,
              flexDirection: "column",
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              alt="studio portrait"
              className="workImage"
              style={{ width: "70%", maxHeight: 400, height: "auto" }}
              src={bioImage[0] ? bioImage[0].url : ""}
            />
          </div>
          <div
            className="imageWithTextModuleText"
            style={{
              display: "flex",
              fontSize: 18,
              flex: 1,
              flexDirection: "column",
            }}
          >
            {bio && (
              <div className="workText" style={{ whiteSpace: "pre-wrap" }}>
                {bio}
                {showCVLink && (
                  <div>
                    <a href="/#/CV" style={{ textDecoration: "none" }}>
                      📄 CV
                    </a>
                  </div>
                )}
                <div>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://www.instagram.com/sammytthebrave/"
                    style={{ textDecoration: "none" }}
                  >
                    🔗 Instagram
                  </a>
                </div>
                <div>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://airtable.com/shr1xUUOkb0Gcs3Uv"
                    style={{ textDecoration: "none" }}
                  >
                    ✉️ Join Mailing List
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
