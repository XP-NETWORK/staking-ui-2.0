import React, { FC, useEffect, useRef, useState } from "react";
import xpLogo from "../../assets/images/xpnet-stake-logo.svg";
import xpLogoMob from "../../assets/images/mob/xpnet-stake-logo.svg";

import classNames from "classnames";

import "./navbar.scss";
import { PopupNav } from "../PopupNav/PopupNav";
import { useLocation, useNavigate } from "react-router";
import { NavBarMobile } from "../NavbarMob/NavBarMobile";
import { ActiveAccountNavbar } from "../ConnectedAccountNavbar/ActiveAccountNavbar";
import { ReduxState } from "../../store/store";
import { useSelector } from "react-redux";
import { NavbarMobActive } from "../NavbarMobActive/NavBarMobActive";
import AccountChainNav from "../AccountChainNav/AccountChainNav";
import { Spin as Hamburger } from "hamburger-react";
import "../NavbarMob/navbarMobile.scss";

interface Props {}

export const Navbar: FC<Props> = ({}) => {
    const [openResources, setOpenResources] = useState(false);
    const [openNavMenu, setOpenNavMenu] = useState(false);

    const [ACTIVE, setACTIVE] = useState(false);
    const { account, evmAccount } = useSelector(
        (state: ReduxState) => state.homePage
    );

    const navigate = useNavigate();
    const location = useLocation();
    const home = location.pathname === "/";
    const gallery = location.pathname === "/gallery";
    const handleClickLogo = () => {
        navigate("/");
    };

    // useOnClickOutside(ref, () => setOpenNavMenu(false));
    useEffect(() => {
        if (account || evmAccount) {
            setACTIVE(true);
        } else {
            setACTIVE(false);
        }
    }, [account, evmAccount]);

    useEffect(() => {
        setOpenNavMenu(false);
    }, [location.pathname]);

    return (
        <>
            <div className="navbar">
                <div className="navWrapper">
                    {window.innerWidth > 320 ? (
                        <img
                            // className={classNames("logo", "deskOnly")}
                            src={xpLogo}
                            alt="logo"
                            onClick={handleClickLogo}
                        />
                    ) : (
                        <img
                            // className={classNames("logo", "mobOnly")}
                            src={xpLogoMob}
                            alt="logoMOb"
                            onClick={handleClickLogo}
                        />
                    )}
                    {!ACTIVE && (
                        <div className="navLinksWrapper">
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
                            {/* <div className="navMediaWrapper">
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
                            </div> */}
                        </div>
                    )}
                    {ACTIVE && (
                        <div className="navLinksWrapperActive deskOnly">
                            <ActiveAccountNavbar />
                        </div>
                    )}
                    <div
                        style={{ pointerEvents: openNavMenu ? "none" : "auto" }}
                        className="menuIcon"
                        onClick={
                            openNavMenu
                                ? () => {}
                                : (e) => {
                                      e.stopPropagation();
                                      setOpenNavMenu(!openNavMenu);
                                  }
                        }
                    >
                        <Hamburger
                            toggled={openNavMenu}
                            toggle={setOpenNavMenu}
                            size={20}
                            onToggle={(toggled) => {
                                if (toggled) {
                                    setOpenNavMenu(true); // open a menu
                                } else {
                                    setOpenNavMenu(false);
                                }
                            }}
                        />
                        {/* {!openNavMenu ? (
                            <img
                                // className={classNames("desktopOnly")}
                                src={burger}
                                alt="menu"
                            />
                        ) : (
                            <img
                                // className={classNames("mobOnly")}
                                src={closemenu}
                                alt="close-menu"
                            />
                        )} */}
                        {/* {!openNavMenu && (
                            <img
                                className={classNames("desktopOnly")}
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
                        )} */}
                    </div>
                </div>
            </div>
            {openResources && (
                <PopupNav close={() => setOpenResources(false)} />
            )}
            {ACTIVE && (
                <div className="mobOnly">
                    <AccountChainNav />
                </div>
            )}
            {openNavMenu && account && (
                <NavBarMobile setOpen={setOpenNavMenu} />
            )}
            {openNavMenu && (home || gallery) && !account && (
                <NavbarMobActive setOpen={setOpenNavMenu} />
            )}
        </>
    );
};
