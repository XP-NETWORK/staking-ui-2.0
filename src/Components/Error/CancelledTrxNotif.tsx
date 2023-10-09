import React from "react";
import "./error.scss";
import { ReactComponent as Close } from "../../assets/images/close-icon.svg";
import errorIcon from "../../assets/images/bxs_error-alt.svg";

import { useDispatch } from "react-redux";
import { setCancelledTrx } from "../../store/reducer/homePageSlice";

export const CancelledTrxNotif = () => {
    const dispath = useDispatch();
    return (
        <div className={`NotifBlock`}>
            <img src={errorIcon} alt="errorIcon" />
            <span>Transaction rejected by the user</span>
            <Close
                className="closeBtn"
                onClick={() => dispath(setCancelledTrx(false))}
            />
        </div>
    );
};
