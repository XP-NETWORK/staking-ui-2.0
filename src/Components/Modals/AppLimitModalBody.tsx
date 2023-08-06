import React, { FC, useRef } from "react";
import { useDispatch } from "react-redux";
import { useOnClickOutside } from "../../assets/ts/helpers";
import {
    setConnectModalShow,
    setShowAppLimitModal,
} from "../../store/reducer/homePageSlice";
import { Close } from "../Buttons/Close";

interface Props {}

export const AppLimitModalBody: FC<Props> = () => {
    const ref = useRef(null);
    const dispatch = useDispatch();
    const handleMOdalClose = () => {
        dispatch(setShowAppLimitModal(false));
    };
    const handleClickOnChange = () => {
        dispatch(setShowAppLimitModal(false));
        dispatch(setConnectModalShow(true));
    };

    useOnClickOutside(ref, handleMOdalClose);

    return (
        <div
            style={{
                position: "fixed",
                top: "-200px",
                display: "grid",
                placeItems: "center",
                height: "110%",
                width: "100%",
                zIndex: 99,
            }}
        >
            <div ref={ref} className="limit-modal__container">
                <div className="limit-modal-header">
                    <div>Notice</div>
                    <Close func={handleMOdalClose} />
                </div>
                <div className="line"></div>
                <div className="limit-modal-text">
                    You've reached the maximum number of staking possible for
                    this period. Please select a different staking period or
                    change your wallet.
                </div>
                <div onClick={handleClickOnChange} className="limit-modal-btn">
                    Change wallet
                </div>
            </div>
        </div>
    );
};
