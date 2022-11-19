import { FC } from "react";
import classNames from "classnames";

import docs from "../../assets/images/menu icons/Docs.svg";
import roadmap from "../../assets/images/menu icons/roadmap.svg";
import security from "../../assets/images/menu icons/security.svg";
import whitepaper from "../../assets/images/menu icons/Whitepaper.svg";
import github from "../../assets/images/menu icons/github.svg";
import blog from "../../assets/images/menu icons/blog.svg";

import "./popupNav.scss";
interface Props {
  close: Function;
}

export const PopupNav: FC<Props> = ({ close }) => {
  return (
    <>
      <div
        className={classNames("popupNav", "deskOnly")}
        onMouseLeave={() => close(true)}
      >
        <div className="popupWrapper">
          <div className="popupWrapperRow">
            <a href="https://docs.xp.network/" target="_blank" rel="noreferrer">
              <label className="title">
                <img src={docs} alt="doc_img"/> Docs
              </label>
              <p>API documentation, tutorials, and other resources</p>
            </a>
            <a
              href="https://docs.xp.network/docs/roadmap/"
              target="_blank"
              rel="noreferrer"
            >
              <label className="title">
                <img src={roadmap} alt="roadmap_img"/> Roadmap
              </label>
              <p>Follow our journey from inception to launch</p>
            </a>
            <a
              href="https://xp.network/security/"
              target="_blank"
              rel="noreferrer"
            >
              <label className="title">
                <img src={security} alt="security_img"/> Security
              </label>
              <p>Discover intricate, multi-layer security system.</p>
            </a>
          </div>
          <div className="popupWrapperRow">
            <a
              href="https://docs.xp.network/docs/Whitepaper2.0/introduction/"
              target="_blank"
              rel="noreferrer"
            >
              <label className="title">
                <img src={whitepaper} alt="whitepaper_img"/> White Paper
              </label>
              <p>
                A closer look at the architecture, bridging algorithm, and
                security
              </p>
            </a>
            <a
              href="https://github.com/xp-network/"
              target="_blank"
              rel="noreferrer"
            >
              <label className="title">
                <img src={github} alt="github_img"/> GitHub
              </label>
              <p>The latest technical updates & code releases</p>
            </a>
            <a href="https://blog.xp.network/" target="_blank" rel="noreferrer">
              <label className="title">
                <img src={blog} alt="blog_img"/> Blog
              </label>
              <p>XP Stories and news</p>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
