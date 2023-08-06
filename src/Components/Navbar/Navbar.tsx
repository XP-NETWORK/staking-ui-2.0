import React, { FC, useEffect, useState } from "react";
import xpLogo from "../../assets/images/xpnet-stake-logo.svg";
import xpLogoMob from "../../assets/images/mob/xpnet-stake-logo.svg";

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
import { useDispatch } from "react-redux";
import { setErrorModal } from "../../store/reducer/homePageSlice";
import { AccountMenu } from "../AccountMenu/AccountMenu";

interface Props {}

export const Navbar: FC<Props> = () => {
    const dispatch = useDispatch();
    const [openResources, setOpenResources] = useState(false);

    const [openNavMenu, setOpenNavMenu] = useState<boolean>();

    const [ACTIVE, setACTIVE] = useState(false);
    const { account, evmAccount, showAccountMenu } = useSelector(
        (state: ReduxState) => state.homePage
    );

    const navigate = useNavigate();
    const location = useLocation();
    const home = location.pathname === "/";
    const gallery = location.pathname === "/gallery";
    const handleClickLogo = () => {
        navigate("/");
    };

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
            <div
                style={{
                    marginBottom:
                        location.pathname !== "/" && window.innerWidth < 768
                            ? "0"
                            : "",
                }}
                className="navbar"
            >
                <div className="navWrapper">
                    {window.innerWidth > 320 ? (
                        <img
                            style={{ cursor: "pointer" }}
                            src={xpLogo}
                            alt="logo"
                            onClick={handleClickLogo}
                        />
                    ) : (
                        <img
                            style={{ cursor: "pointer" }}
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
                            <div
                                onClick={() => {
                                    dispatch(setErrorModal("navbar"));
                                }}
                                className="byXPNET"
                            >
                                Buy $XPNET
                            </div>
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
                                ? () => false
                                : () => {
                                      setOpenNavMenu(!openNavMenu);
                                  }
                        }
                    >
                        <Hamburger
                            toggled={openNavMenu}
                            size={20}
                            onToggle={(toggled) => {
                                if (toggled) {
                                    setOpenNavMenu(true); // open a menu
                                } else {
                                    setOpenNavMenu(false);
                                }
                            }}
                        />
                    </div>
                </div>
                {showAccountMenu && <AccountMenu func={() => false} />}
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
