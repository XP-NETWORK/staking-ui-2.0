import React, { FC, useRef } from "react";
import { Link } from "react-router-dom";
import "./navbarMobActive.scss";
import docs from "../../assets/images/mob/menu icons/Docs.svg";
import roadmap from "../../assets/images/mob/menu icons/roadmap.svg";
import security from "../../assets/images/mob/menu icons/security.svg";
import whitepaper from "../../assets/images/mob/menu icons/Whitepaper.svg";
import github from "../../assets/images/mob/menu icons/github.svg";
import blog from "../../assets/images/mob/menu icons/blog.svg";
import active from "../../assets/images/mob/menu icons/active.svg";

import linkedin from "../../assets/images/menu icons/linkedin icon.svg";
import telegram from "../../assets/images/menu icons/telegram icon.svg";
import twitter from "../../assets/images/menu icons/twitter icon.svg";
import redit from "../../assets/images/menu icons/redit icon.svg";
import classNames from "classnames";
import { ReduxState } from "../../store/store";
import { useSelector, useDispatch } from "react-redux";
import { setLimitModal } from "../../store/reducer/homePageSlice";
import { useOnClickOutside } from "../../assets/ts/helpers";

interface Props {
    setOpen: Function;
}

export const NavbarMobActive: FC<Props> = ({ setOpen }) => {
    const { account, blockchain, balance, evmStakes } = useSelector(
        (state: ReduxState) => state.homePage
    );
    const dispatch = useDispatch();
    const ref = useRef(null);
    useOnClickOutside(ref, () => setOpen(false));
    const route = window.location.pathname;

    const claimLinkStyle: React.CSSProperties = {
        pointerEvents:
            blockchain.chain === "Algorand" && !balance ? "none" : "auto",
        cursor: "pointer",
    };

    return (
        <>
            <div ref={ref} className="navmobile">
                {/* {account && (
                    <div className="activeWrapperMob">
                        <Link to="/stake" className="activeNavLink">
                            Stake XPNET
                        </Link>
                        <Link to="/rewards" className="activeNavLink">
                            Claim XPNET
                        </Link>
                        <Link to="/gallery" className="activeNavLink">
                            NFT Collection
                        </Link>
                    </div>
                )} */}
                {/* {account && blockchain.chain !== "BSC" ? (
                    <Link
                        style={claimLinkStyle}
                        to={"/stake"}
                        className={`activeNavLink ${
                            route === "/stake" ? "active-link" : ""
                        }`}
                    >
                        Stake XPNET
                    </Link>
                ) : (
                    <div
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                            blockchain.chain !== "BSC"
                                ? dispatch(setLimitModal(true))
                                : null
                        }
                        className={`activeNavLink ${
                            route === "/stake" ? "active-link" : ""
                        }`}
                    >
                        Stake XPNET
                    </div>
                )} */}
                {account && (
                    <>
                        <Link
                            onClick={() =>
                                blockchain.chain !== "BSC"
                                    ? dispatch(setLimitModal(true))
                                    : null
                            }
                            style={claimLinkStyle}
                            to={"/stake"}
                            className={`activeNavLink ${
                                route === "/stake" ? "active-link" : ""
                            }`}
                        >
                            Stake XPNET
                        </Link>
                        <Link
                            style={claimLinkStyle}
                            to={
                                blockchain.chain === "BSC" && !evmStakes
                                    ? "error"
                                    : "/rewards"
                            }
                            className={`activeNavLink ${
                                route === "/rewards" ? "active-link" : ""
                            }`}
                        >
                            Claim XPNET
                        </Link>
                        <Link
                            to="/gallery"
                            className={`activeNavLink ${
                                route === "/gallery" ? "active-link" : ""
                            }`}
                        >
                            NFT Collection
                        </Link>
                    </>
                )}
                <label className="line" />
                <div className="activeWrapperMob">
                    <a
                        href="https://xp.network/"
                        target="_blank"
                        rel="noreferrer"
                        className="activeNavLink"
                    >
                        XP.NETWORK
                    </a>
                    <a
                        href="https://xp.network/community/"
                        className="activeNavLink"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Community
                    </a>
                </div>

                {/* <label className="line" /> */}
                {/* <div className="navMediaWrapperMob">
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
        </>
    );
};
