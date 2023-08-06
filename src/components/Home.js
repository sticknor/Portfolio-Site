// React
import React from "react";

function Home({ splashImages }) {
  return (
    <div id="splashContainer">
      <img
        src={splashImages}
        style={{
          minWidth: "100vw",
          minHeight: "100vh",
          width: "100%",
          objectFit: "cover",
        }}
      ></img>
    </div>
  );
}

export default Home;
