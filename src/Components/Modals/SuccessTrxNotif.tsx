import React from "react";
import "../Error/error.scss";
import { ReactComponent as Close } from "../../assets/images/close-icon.svg";
import check from "../../assets/images/green_check.svg";

import { useDispatch } from "react-redux";
import { setSuccessTrx } from "../../store/reducer/homePageSlice";

export const SuccessTrxNotif = () => {
    const dispath = useDispatch();
    return (
        <div className={`NotifBlock sucessfull`}>
            <img src={check} alt="checkicon" />
            <span>Transaction successful!</span>
            <Close
                className="closeBtn"
                onClick={() => dispath(setSuccessTrx(false))}
            />
        </div>
    );
};
