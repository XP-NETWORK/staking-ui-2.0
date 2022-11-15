import React, { FC, useState } from "react";
import xpLogo from "../../assets/images/xpnet-stake-logo.svg";
import xpLogoMob from "../../assets/images/mob/xpnet-stake-logo.svg";
import hamburgerIcon from "../../assets/images/mob/menu.svg";
import CloseMenuIcon from "../../assets/images/mob/close-menu.svg";

import linkedin from "../../assets/images/menu icons/linkedin icon.svg";
import telegram from "../../assets/images/menu icons/telegram icon.svg";
import twitter from "../../assets/images/menu icons/twitter icon.svg";
import redit from "../../assets/images/menu icons/redit icon.svg";
import classNames from "classnames";

import "./navbar.scss";
import { PopupNav } from "../PopupNav/PopupNav";
import { useNavigate } from "react-router";
import { NavBarMobile } from "../NavbarMob/NavBarMobile";
import { ActiveAccountNavbar } from "../ConnectedAccountNavbar/ActiveAccountNavbar";

interface Props {}

export const Navbar: FC<Props> = ({}) => {
  const [openResources, setOpenResources] = useState(false);
  const [openNavMenu, setOpenNavMenu] = useState(false);
  const [ACTIVE, setACTIVE] = useState(false);

  const navigate = useNavigate();

  const handleClickLogo = () => {
    navigate("/");
  };
  return (
    <>
      <div className="navbar">
        <div className="navWrapper">
          <img
            className={classNames("logo", "deskOnly")}
            src={xpLogo}
            alt="logo"
            onClick={handleClickLogo}
          />
          <img
            className={classNames("logo", "mobOnly")}
            src={xpLogoMob}
            alt="logo"
            onClick={handleClickLogo}
          />
          {ACTIVE && <div className="navLinksWrapper">
            <button onMouseOver={() => setOpenResources(true)}>
              Resources
            </button>
            <a
              className="aCommunity"
              href="https://xp.network/community/"
              target="_blank"
              rel="noreferrer"
            >
              Community
            </a>
            <div className="navMediaWrapper">
              <a
                href="https://il.linkedin.com/company/xpnetwork"
                target="_blank"
                rel="noreferrer"
              >
                <img src={linkedin} alt="linkedin" />
              </a>
              <a
                href="https://t.me/xp_network"
                target="_blank"
                rel="noreferrer"
              >
                <img src={telegram} alt="telegram" />
              </a>
              <a
                href="https://twitter.com/xpnetwork_"
                target="_blank"
                rel="noreferrer"
              >
                <img src={twitter} alt="twitter" />
              </a>
              <a
                href="https://www.reddit.com/r/XP_network/"
                target="_blank"
                rel="noreferrer"
              >
                <img src={redit} alt="redit" />
              </a>
            </div>
          </div>}
          {!ACTIVE && <div className="navLinksWrapperActive">
            <ActiveAccountNavbar/>
            </div>}
          <button
            className="menuIcon"
            onClick={() => setOpenNavMenu(!openNavMenu)}
          >
            {!openNavMenu && (
              <img
                className={classNames("mobOnly")}
                src={hamburgerIcon}
                alt="menu"
              />
            )}
            {openNavMenu && (
              <img
                className={classNames("mobOnly")}
                src={CloseMenuIcon}
                alt="close-menu"
              />
            )}
          </button>
        </div>
      </div>
      {openResources && <PopupNav close={() => setOpenResources(false)} />}
      {openNavMenu && <NavBarMobile />}
    </>
  );
};
