import React, { FC, useEffect } from "react";
import xpnet from "../../assets/images/coin/XPNET.svg";
import "./footer.scss";

interface Props {}

export const Footer: FC<Props> = () => {
    return (
        <div className="footer">
            <div className="powered-by__container">
                <img className="powered-by-logo" src={xpnet} alt="" />
                <div className="powered-by-text">
                    <div>Powered by</div>
                    <div>XP.NETWORK</div>
                </div>
            </div>
            <div>© 2022 XP.NETWORK Ltd. All Rights Reserved</div>
        </div>
    );
};
