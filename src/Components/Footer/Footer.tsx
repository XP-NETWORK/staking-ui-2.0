import React, { FC, useEffect } from "react";
import xpnet from "../../assets/images/coin/XPNET.svg";
import "./footer.scss";
import SocIcons from "./SocIcons";

interface Props {}

export const Footer: FC<Props> = () => {
    return (
        <div className="footer">
            <div className="upper-footer">
                <div className="powered-by__container">
                    <img className="powered-by-logo" src={xpnet} alt="" />
                    <div className="powered-by-text">
                        <div>Powered by</div>
                        <div>XP.NETWORK</div>
                    </div>
                </div>
                <SocIcons />
            </div>
            <div className="all-rights">
                <span>© 2023 XP.NETWORK Ltd.</span>
                <span>All Rights Reserved</span>
            </div>
        </div>
    );
};
