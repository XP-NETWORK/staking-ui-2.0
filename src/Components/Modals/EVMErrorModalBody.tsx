import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import {
    setConnectModalShow,
    setErrorModal,
} from "../../store/reducer/homePageSlice";
import close from "../../assets/images/close-icon.svg";
import angular from "../../assets/images/angular.svg";
import gate from "../../assets/images/gate.svg";
import pancake from "../../assets/images/pancake.svg";
import mexc from "../../assets/images/mecslogo.svg";
import mexcsign from "../../assets/images/mecssign.svg";

import { useOnClickOutside } from "../../assets/ts/helpers";
import "../../Components/Error/error.scss";
import { useSelector } from "react-redux";
import { ReduxState } from "../../store/store";

interface Props {
    error: string | boolean;
}

export default function EVMErrorModalBody({ error }: Props) {
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
                window.open("https://token.bridge.xp.network", "_blank");
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
                zIndex: 99,
            }}
        >
            <div ref={ref} className="errorWraper">
                <span
                    onClick={() => dispatch(setErrorModal(false))}
                    className="errorWraper-close"
                >
                    <img src={close} alt="" />
                </span>

                <div className="error-header">
                    <div className="header-tittle">Oh nooooo</div>
                    <div className="header-text">
                        Seems you don’t have any XPNET staked.
                    </div>
                </div>
                <div className="error-menu">
                    <div className="error-menu-btn">
                        <div
                            onClick={() => handleButtonClick("Bridge")}
                            className="btn-text"
                        >
                            Sake XPNET to Algorand{" "}
                        </div>
                        <div className="btn-icon">
                            <img src={angular} alt="" />
                        </div>
                    </div>
                    <div
                        className="error-menu-btn"
                        onClick={() => handleButtonClick("Change")}
                    >
                        <div className="btn-text">Change wallet</div>
                        <div className="btn-icon">
                            <img src={angular} alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
