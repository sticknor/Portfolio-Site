// React
import React from "react";

function PageProcess({ posts }) {
  if (!posts) return null;
  return (
    <div style={{ marginTop: "64px" }}>
      <div
        style={{ display: "flex", flexDirection: "column", padding: "64px" }}
        className="mobilePadding"
      >
        {posts.map((post, index) => {
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "64px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "64px",
                }}
              >
                <div style={{ opacity: 0.5, marginBottom: "16px" }}>
                  {post.date}
                </div>
                <div style={{ fontWeight: 600 }}>{post.title}</div>
              </div>
              <div>
                {post.imageLinks.map((link) => {
                  return <img width="300px" height="auto" src={link} />;
                })}
                <div>{post.text}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PageProcess;
