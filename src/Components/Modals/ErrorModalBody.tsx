import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import {
    setConnectModalShow,
    setErrorModal,
} from "../../store/reducer/homePageSlice";
import close from "../../assets/images/close-icon.svg";
import { useOnClickOutside } from "../../assets/ts/helpers";
import "../../Components/Error/error.scss";
import { useSelector } from "react-redux";
import { ReduxState } from "../../store/store";

interface Props {}

export default function ErrorModalBody({}: Props) {
    const mobile = window.innerWidth < 600;
    const dispatch = useDispatch();
    const ref = React.useRef<HTMLInputElement>(null);
    const { connectedWallet, evmAccount } = useSelector(
        (state: ReduxState) => state.homePage
    );
    const evmErrorText = connectedWallet && evmAccount;
    useOnClickOutside(ref, () => dispatch(setErrorModal(false)));

    const handleButtonClick = (btn: string) => {
        switch (btn) {
            case "Bridge":
                window.open("https://token.bridge.xp.network", "_blank");
                dispatch(setErrorModal(false));

                break;
            case "Change":
                dispatch(setErrorModal(false));
                dispatch(setConnectModalShow(true));
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
                <h4>Oh nooooo</h4>
                <p>Seems you don’t have any staked XPNET.</p>
                <div className="btns">
                    <button
                        className="changeWalletBtn"
                        onClick={() => handleButtonClick("Change")}
                    >
                        Change wallet
                    </button>
                    <button
                        className="changeWalletBtn"
                        onClick={() => handleButtonClick("Bridge")}
                    >
                        XPNET Bridge
                    </button>
                </div>
            </div>
        </div>
    );
}
