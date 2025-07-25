// React
import React, { useState, useEffect } from "react";

function PageAbout({ base }) {
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
  }, [base]);

  return (
    <div style={{ marginTop: "64px", minHeight: "100vh" }}>
      <div
        style={{
          padding: "64px",
          display: "flex",
          flexDirection: "column",
          gap: "32px",
          alignItems: "flex-start",
          justifyContent: "flex-start",
        }}
        className="mobileStack mobilePadding mobileGap"
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "250px",
            maxWidth: "100%",
          }}
        >
          <img
            alt="Studio portrait of Sam Ticknor"
            style={{ width: "100%", height: "auto", fontSize: "8px" }}
            src={bioImage[0] ? bioImage[0].url : ""}
          />
          <div
            style={{
              fontSize: 14,
              opacity: 0.5,
              marginTop: "16px",
              textAlign: "left",
            }}
          >
            Studio portrait <br />
            by David Vades Joseph
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            gap: "32px",
          }}
          className="mobileGap"
        >
          {bio && (
            <div style={{ maxWidth: "900px", whiteSpace: "pre-wrap" }}>
              {bio}
            </div>
          )}
          <iframe
            width="100%"
            style={{ maxWidth: "600px" }}
            height="100%"
            src="https://www.youtube.com/embed/hvpI37uUQEw?si=s6ci3FbgfTz9LVaC"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
          {showCVLink && (
            <a
              href="/#/CV"
              className="clickable"
              style={{
                textDecoration: "underline",
                fontWeight: 600,
              }}
            >
              CV
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default PageAbout;
