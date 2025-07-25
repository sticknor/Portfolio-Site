// React
import React from "react";

function PageContact({ base }) {
  return (
    <div style={{ marginTop: "64px", minHeight: "100vh" }}>
      <div
        style={{
          padding: "64px",
          display: "flex",
          flexDirection: "column",
          gap: 64,
          alignItems: "flex-start",
          justifyContent: "flex-start",
        }}
        className="mobileStack mobilePadding mobileGap"
      >
        <div>
          To recieve the occasional studio update, such as exhibition
          announcements and studio sales,
          <br />
          <a
            target="_blank"
            rel="noreferrer"
            href="https://airtable.com/appFu4bKxcQWPoN69/shrU6lsf5P4fqJlpj"
            style={{ fontWeight: 600, textDecoration: "none" }}
            className="clickable"
          >
            sign up for my mailing list
          </a>
        </div>

        <div>
          I'm on Instagram,
          <br />
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.instagram.com/sammytthebrave/"
            style={{ fontWeight: 600, textDecoration: "none" }}
            className="clickable"
          >
            @sammytthebrave
          </a>
        </div>

        <div>
          Email me with inquiries, opportunities, questions, greetings,
          <br />
          <a
            target="_blank"
            rel="noreferrer"
            href="mailto:srticknor@gmail.com"
            style={{ fontWeight: 600, textDecoration: "none" }}
            className="clickable"
          >
            srticknor@gmail.com
          </a>
        </div>
      </div>
    </div>
  );
}

export default PageContact;
