import React, { FC, useRef, useState } from "react";
import "./navbarMobile.scss";
import docs from "../../assets/images/mob/menu icons/Docs.svg";
import roadmap from "../../assets/images/mob/menu icons/roadmap.svg";
import security from "../../assets/images/mob/menu icons/security.svg";
import whitepaper from "../../assets/images/mob/menu icons/Whitepaper.svg";
import github from "../../assets/images/mob/menu icons/github.svg";
import blog from "../../assets/images/mob/menu icons/blog.svg";
import active from "../../assets/images/mob/menu icons/active.svg";
import { Link } from "react-router-dom";

import linkedin from "../../assets/images/menu icons/linkedin icon.svg";
import telegram from "../../assets/images/menu icons/telegram icon.svg";
import twitter from "../../assets/images/menu icons/twitter icon.svg";
import redit from "../../assets/images/menu icons/redit icon.svg";
import { useDispatch, useSelector } from "react-redux";
import { ReduxState } from "../../store/store";
import { useOnClickOutside } from "../../assets/ts/helpers";
import { setLimitModal } from "../../store/reducer/homePageSlice";

interface Props {
    setOpen: Function;
}

export const NavBarMobile: FC<Props> = ({ setOpen }) => {
    const { lastCommit, account, blockchain, evmStakes, balance } = useSelector(
        (state: ReduxState) => state.homePage
    );
    const ref = useRef(null);
    const [isShown, setIsShown] = useState(false);
    useOnClickOutside(ref, () => setOpen(false));
    const dispatch = useDispatch();
    const route = window.location.pathname;

    const claimLinkStyle: React.CSSProperties = {
        pointerEvents:
            blockchain.chain === "Algorand" && !balance ? "none" : "auto",
        cursor: "pointer",
    };

    return (
        <>
            <div ref={ref} className="navmobile">
                {account && (
                    <>
                        <Link className={`activeNavLink`} to={"/"}>
                            Home
                        </Link>
                        <Link
                            onClick={() =>
                                blockchain.chain === "BSC"
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
                <div
                    style={{ cursor: "pointer" }}
                    onClick={() => setIsShown(!isShown)}
                    className={`activeNavLink`}
                >
                    Resources
                </div>
                <div className="linksNavMob">
                    {isShown && (
                        <div className="res-nav">
                            <a
                                href="https://docs.xp.network/"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <label className="title">
                                    <img src={docs} /> Docs
                                </label>
                            </a>{" "}
                            {/* <span /> */}
                            <a
                                href="https://docs.xp.network/docs/roadmap/"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <label className="title">
                                    <img src={roadmap} /> Roadmap
                                </label>
                            </a>{" "}
                            {/* <span /> */}
                            <a
                                href="https://docs.xp.network/docs/Whitepaper2.0/introduction/"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <label className="title">
                                    <img src={whitepaper} /> White Paper
                                </label>
                            </a>{" "}
                            {/* <span /> */}
                            <a
                                href="https://github.com/xp-network/"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <label className="title">
                                    <img src={github} /> GitHub
                                </label>
                                <div className="git-last--mobile">
                                    <div className="git-last-dot-bg"></div>
                                    <div>Latest {lastCommit}</div>
                                </div>
                            </a>
                            {/* <span /> */}
                            <a
                                href="https://blog.xp.network/"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <label className="title">
                                    <img src={blog} /> Blog
                                </label>
                            </a>
                            {/* <span /> */}
                            <a
                                href="https://xp.network/security/"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <label className="title">
                                    <img src={security} /> Security
                                </label>
                            </a>
                        </div>
                    )}
                </div>

                <a
                    className={`activeNavLink`}
                    href="https://xp.network/community/"
                    target="_blank"
                    rel="noreferrer"
                    // className="titleNav"
                    // style={{ marginTop: "0px", padding: "13px 16px" }}
                >
                    Community
                </a>

                {/* <label className="line" />
                <div className="navMediaWrapperMob">
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
