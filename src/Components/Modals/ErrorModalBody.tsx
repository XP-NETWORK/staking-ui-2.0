import React from "react";
import { useDispatch } from "react-redux";

import {
    setConnectModalShow,
    setErrorModal,
} from "../../store/reducer/homePageSlice";
import close from "../../assets/images/close-icon.svg";
import angular from "../../assets/images/angular.svg";
import gate from "../../assets/images/gate.svg";
import pancake from "../../assets/images/pancake.svg";
import mexc from "../../assets/images/mecslogo.svg";

import "../../Components/Error/error.scss";
import { useSelector } from "react-redux";
import { ReduxState } from "../../store/store";
import { ReactComponent as Close } from "../../assets/images/close-icon.svg";
import { useNavigate } from "react-router";

interface Props {
    error?: string | boolean;
}

export default function ErrorModalBody({ error }: Props) {
    const { showErrorModal } = useSelector(
        (state: ReduxState) => state.homePage
    );
    console.log({ error });

    const mobile = window.innerWidth < 600;
    const dispatch = useDispatch();
    const ref = React.useRef<HTMLInputElement>(null);
    // const { connectedWallet, evmAccount } = useSelector(
    //     (state: ReduxState) => state.homePage
    // );
    // const evmErrorText = connectedWallet && evmAccount;

    // useOnClickOutside(ref, () => dispatch(setErrorModal(false)));

    const handleButtonClick = (btn: string) => {
        switch (btn) {
            case "Bridge":
                window.open("https://token.bridge.xp.network", "_top");
                // dispatch(setErrorModal(false));

                break;
            case "Change":
                dispatch(setErrorModal(false));
                dispatch(setConnectModalShow(true));
                break;
            default:
                break;
        }
    };

    const handleExchangeClick = (btn: string) => {
        switch (btn) {
            case "pancakeswap":
                window.open("https://pancakeswap.finance/", "_blank");
                break;
            case "gate":
                window.open("https://www.gate.io/", "_blank");
                break;
            case "mexc":
                window.open("https://www.mexc.com/", "_blank");
                break;
            default:
                break;
        }
    };

    const navigate = useNavigate();

    return (
        <div
            className="connect-modal"
            style={{
                position: "fixed",
                left: "0px",
                top: mobile ? "-20px" : "0px",
                display: "grid",
                placeItems: "center",
                height: "110%",
                width: "100%",
                backdropFilter: "blur(15px)",
                zIndex: "59",
            }}
        >
            <div ref={ref} className="errorWraper">
                <Close
                    className="closeBtn"
                    onClick={() => {
                        dispatch(setErrorModal(false));
                        navigate("/");
                    }}
                />
                {showErrorModal === "navbar" && (
                    <span
                        onClick={() => dispatch(setErrorModal(false))}
                        className="errorWraper-close"
                    >
                        <img src={close} alt="" />
                    </span>
                )}
                {showErrorModal !== "navbar" && (
                    <div className="error-header">
                        <div className="header-tittle">Oh nooooo</div>
                        <div className="header-text">
                            Seems you don’t have Algorand based $XPNETs in your
                            wallet.
                        </div>
                    </div>
                )}
                <div className="error-menu">
                    {showErrorModal !== "navbar" && (
                        <div className="error-menu-btn">
                            <div
                                onClick={() => handleButtonClick("Bridge")}
                                className="btn-text"
                            >
                                Bridge $XPNET form BSC
                                <br /> to Algorand{" "}
                            </div>
                            <div className="btn-icon">
                                <img src={angular} alt="" />
                            </div>
                        </div>
                    )}
                    <div className="exchange-container">
                        <div className="exchange-header">Buy $XPNET</div>
                        <div
                            className="exchange-btn pancakeswap"
                            onClick={() => handleExchangeClick("pancakeswap")}
                        >
                            <div className="exchange-btn-icon">
                                <img src={pancake} alt="" />
                            </div>
                            <div className="exchange-btn-link">Pancakeswap</div>
                            <img src={angular} alt="" />
                        </div>
                        <div
                            className="exchange-btn gate"
                            onClick={() => handleExchangeClick("gate")}
                        >
                            <div className="exchange-btn-icon">
                                <img src={gate} alt="" />
                            </div>
                            <div className="exchange-btn-link">Gate.io</div>
                            <img src={angular} alt="" />
                        </div>
                        <div
                            className="exchange-btn mexc"
                            onClick={() => handleExchangeClick("mexc")}
                        >
                            <div className="exchange-btn-icon">
                                <img src={mexc} alt="" />
                            </div>
                            <div className="exchange-btn-link"></div>
                            <img src={angular} alt="" />
                        </div>
                    </div>

                    {showErrorModal !== "navbar" && (
                        <div
                            className="error-menu-btn"
                            onClick={() => handleButtonClick("Change")}
                        >
                            <div className="btn-text">Change wallet</div>
                            <div className="btn-icon">
                                <img src={angular} alt="" />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
