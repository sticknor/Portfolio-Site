// React
import React from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar({ showProcess }) {
  let location = useLocation();
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "64px",
        background:
          "linear-gradient( 90deg, rgb(255 255 240) 0%, rgb(246 254 255) 100% )",
        display: "flex",
        justifyContent: "flex-start",
        zIndex: 101,
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: "32px",
          padding: "0px 32px",
        }}
        className="mobilePaddingSmall"
      >
        <Link
          style={{
            textDecoration: "none",
            fontWeight: 600,
            color: "black",
            fontSize: "16px",
            whiteSpace: "nowrap",
            lineHeight: "100%",
            color: "#999",
          }}
          to="/"
        >
          Sam
          <br />
          Ticknor
        </Link>
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            gap: "32px",
          }}
          className="mobileGap"
        >
          <Link
            className={location.pathname === "/" ? "" : "clickable"}
            style={{
              textDecoration: location.pathname === "/" ? "underline" : "none",
              color: "black",
              fontWeight: 600,
            }}
            to="/"
          >
            Works
          </Link>
          {showProcess && (
            <Link
              className={location.pathname === "/process" ? "" : "clickable"}
              style={{
                textDecoration:
                  location.pathname === "/process" ? "underline" : "none",
                color: "black",
                fontWeight: 600,
              }}
              to="/process"
            >
              Process
            </Link>
          )}
          <Link
            className={location.pathname === "/about" ? "" : "clickable"}
            style={{
              textDecoration:
                location.pathname === "/about" ? "underline" : "none",
              color: "black",
              fontWeight: 600,
            }}
            to="/about"
          >
            About
          </Link>
          <Link
            className={location.pathname === "/contact" ? "" : "clickable"}
            style={{
              textDecoration:
                location.pathname === "/contact" ? "underline" : "none",
              color: "black",
              fontWeight: 600,
            }}
            to="/contact"
          >
            Contact
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
