import React, { FC } from "react";
import "./navbarMobile.scss";
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
import { useSelector } from "react-redux";
import { ReduxState } from "../../store/store";

interface Props {}

export const NavBarMobile: FC<Props> = ({}) => {
    const { lastCommit } = useSelector((state: ReduxState) => state.homePage);

    return (
        <>
            <div className="navmobile">
                <div className="titleNav">Resources</div>
                <div className="linksNavMob">
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
                        <span />
                        <a
                            href="https://docs.xp.network/docs/roadmap/"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <label className="title">
                                <img src={roadmap} /> Roadmap
                            </label>
                        </a>{" "}
                        <span />
                        <a
                            href="https://docs.xp.network/docs/Whitepaper2.0/introduction/"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <label className="title">
                                <img src={whitepaper} /> White Paper
                            </label>
                        </a>{" "}
                        <span />
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
                        <span />
                        <a
                            href="https://blog.xp.network/"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <label className="title">
                                <img src={blog} /> Blog
                            </label>
                        </a>
                        <span />
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
                </div>

                <a
                    href="https://xp.network/community/"
                    target="_blank"
                    rel="noreferrer"
                    className="titleNav"
                    style={{ marginTop: "0px", padding: "13px 16px" }}
                >
                    Community
                </a>

                <label className="line" />
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
                </div>
            </div>
        </>
    );
};
