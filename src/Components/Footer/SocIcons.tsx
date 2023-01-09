import React from "react";
import linkedin from "../../assets/images/socicons/linkedin.svg";
import telegram from "../../assets/images/socicons/telegram.svg";
import twitter from "../../assets/images/socicons/twitter.svg";
import redit from "../../assets/images/socicons/redit.svg";

export default function SocIcons() {
    return (
        <div className="footer-soc-icons">
            <span>
                <a
                    rel="noreferrer"
                    href="https://www.linkedin.com/company/xpnetwork/mycompany/"
                    target="_blank"
                >
                    <img src={linkedin} alt="" />
                </a>
            </span>
            <span>
                <a
                    rel="noreferrer"
                    href="https://t.me/xp_network"
                    target="_blank"
                >
                    <img src={telegram} alt="" />
                </a>
            </span>
            <span>
                <a
                    href="https://twitter.com/xpnetwork_"
                    target="_blank"
                    rel="noreferrer"
                >
                    <img src={twitter} alt="" />
                </a>
            </span>
            <span>
                <a
                    href="https://www.reddit.com/user/XP_network/"
                    target="_blank"
                    rel="noreferrer"
                >
                    <img src={redit} alt="" />
                </a>
            </span>
        </div>
    );
}
