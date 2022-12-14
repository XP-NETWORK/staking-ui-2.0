import { FC } from "react";
import classNames from "classnames";

import docs from "../../assets/images/menu icons/Docs.svg";
import roadmap from "../../assets/images/menu icons/roadmap.svg";
import security from "../../assets/images/menu icons/security.svg";
import whitepaper from "../../assets/images/menu icons/Whitepaper.svg";
import github from "../../assets/images/menu icons/github.svg";
import blog from "../../assets/images/menu icons/blog.svg";

import "./popupNav.scss";
import { useSelector } from "react-redux";
import { ReduxState } from "../../store/store";
interface Props {
    close: Function;
}

export const PopupNav: FC<Props> = ({ close }) => {
    const { lastCommit } = useSelector((state: ReduxState) => state.homePage);

    return (
        <>
            <div
                className={classNames("popupNav", "deskOnly")}
                onMouseLeave={() => close(true)}
            >
                <div className="popupWrapper">
                    <div className="popupWrapper-item">
                        <a
                            href="https://docs.xp.network/"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <label className="title">
                                <img src={docs} alt="doc_img" /> Docs
                            </label>
                            <p>
                                API documentation, tutorials, and other
                                resources
                            </p>
                        </a>
                    </div>
                    <div className="popupWrapper-item">
                        <a
                            href="https://docs.xp.network/docs/roadmap/"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <label className="title">
                                <img src={roadmap} alt="roadmap_img" /> Roadmap
                            </label>
                            <p>Follow our journey from inception to launch</p>
                        </a>
                    </div>

                    <div className="popupWrapper-item">
                        <a
                            href="https://xp.network/security/"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <label className="title">
                                <img src={security} alt="security_img" />{" "}
                                Security
                            </label>
                            <p>
                                Discover intricate, multi-layer security system.
                            </p>
                        </a>
                    </div>
                    <div className="popupWrapper-item">
                        <a
                            href="https://docs.xp.network/docs/Whitepaper2.0/introduction/"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <label className="title">
                                <img src={whitepaper} alt="whitepaper_img" />{" "}
                                White Paper
                            </label>
                            <p>
                                A closer look at the architecture, bridging
                                algorithm, and security
                            </p>
                        </a>
                    </div>

                    <div className="popupWrapper-item">
                        <a
                            href="https://github.com/xp-network/"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <label className="title">
                                <img src={github} alt="github_img" /> GitHub
                                <div className="git-last">
                                    <span className="git-last-dot-bg"></span>
                                    <span className="git-last-date">
                                        Last {lastCommit}
                                    </span>
                                </div>
                            </label>
                            <p>The latest technical updates & code releases</p>
                        </a>
                    </div>

                    <div className="popupWrapper-item">
                        <a
                            href="https://blog.xp.network/"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <label className="title">
                                <img src={blog} alt="blog_img" /> Blog
                            </label>
                            <p>XP Stories and news</p>
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
};
