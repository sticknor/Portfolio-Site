// React
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function Menu(props) {
  const { menuItems, siteTitle, isLoading } = props;

  if (isLoading) {
    return (
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div class="lds-circle">
          <div></div>
        </div>
      </div>
    );
  }

  return (
    <div id="menuContainer">
      <div id="menu">
        <Link className="menuOption clickable homeMenuOption" to={"/"}>
          {siteTitle}
        </Link>

        {menuItems.map((menuItem, index) => {
          if (menuItem.isLink === true && menuItem.showInMenu) {
            return (
              <a
                className="menuOption clickable"
                href={menuItem.menuLink}
                target="_blank"
                key={`menu-${menuItem.pageRoute}`}
              >
                <>
                  <span className="menuOptionTitle">{menuItem.pageTitle}</span>
                  {menuItem.pageSubtitle && (
                    <>
                      <br />
                      <span className="menuOptionSubtitle">
                        {menuItem.pageSubtitle}
                      </span>
                    </>
                  )}
                </>
              </a>
            );
          } else if (menuItem.showInMenu) {
            return (
              <Link
                className="menuOption clickable"
                to={menuItem.pageRoute}
                key={`menu-${menuItem.pageRoute}`}
              >
                <>
                  <span className="menuOptionTitle">{menuItem.pageTitle}</span>
                  {menuItem.pageSubtitle && (
                    <>
                      <br />
                      <span className="menuOptionSubtitle">
                        {menuItem.pageSubtitle}
                      </span>
                    </>
                  )}
                </>
              </Link>
            );
          } else {
            return null;
          }
        })}
      </div>
    </div>
  );
}

Menu.propTypes = {
  siteTitle: PropTypes.string,
  menuItems: PropTypes.array,
};

export default Menu;
