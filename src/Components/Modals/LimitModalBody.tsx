import React, { useState } from "react";
import pop from "../../assets/images/coin/pop.svg";
import algo from "../../assets/images/coin/algo1.svg";
import { useSelector } from "react-redux";
import { ReduxState } from "../../store/store";
import close from "../../assets/images/close-icon.svg";
import {
    setBlockchain,
    setConnectModalShow,
    setLimitModal,
    setShowNotifyModal,
} from "../../store/reducer/homePageSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { BLOCKCHAINS } from "../../assets/ts/Consts";
import axios from "axios";

interface Props {}

export default function LimitModalBody({}: Props) {
    const mobile = window.innerWidth < 600;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [notify, setNotify] = useState(false);
    const [validMail, setValidMail] = useState(false);
    const { evmStakesArray, evmAccount, account } = useSelector(
        (state: ReduxState) => state.homePage
    );
    const [input, setInput] = useState("");
    // const claimBtnStyle: React.CSSProperties = {
    //     pointerEvents: evmStakesArray.length > 0 ? "auto" : "none",
    // };

    const handleClickOnStake = () => {
        if (!account) {
            dispatch(setBlockchain(BLOCKCHAINS[0]));
            dispatch(setLimitModal(false));
            dispatch(setConnectModalShow(true));
        } else {
            dispatch(setBlockchain(BLOCKCHAINS[0]));
            dispatch(setLimitModal(false));
            navigate("/rewards");
        }
    };

    const handleClickOnClaim = () => {
        dispatch(setBlockchain(BLOCKCHAINS[1]));
        if (evmAccount) {
            dispatch(setLimitModal(false));

            navigate("/rewards");
        } else {
            dispatch(setLimitModal(false));
            dispatch(setConnectModalShow(true));
        }
    };

    const handleClickOnNOtifyMe = () => {
        setNotify(true);
    };

    const handleInput = (str: string) => {
        const regex =
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (!str || regex.test(str) === false) {
            setInput(str);
            setValidMail(false);
        } else {
            setInput(str);
            setValidMail(true);
        }
    };

    const onNotifyClick = async () => {
        // axios
        //     .post("some/route", { email: input })
        //     .then((e: any) => console.log(e));
    };

    return (
        <div
            className="connect-modal"
            style={{
                position: "fixed",
                left: "0px",
                top: mobile ? "-20px" : "0px",
                paddingTop: "70px",
                display: "grid",
                placeItems: "center",
                height: "110%",
                width: "100%",
                backdropFilter: "blur(15px)",
                zIndex: 99,
            }}
        >
            <div className="limitWraper">
                <span
                    onClick={() => dispatch(setLimitModal(false))}
                    className="limitWraper-close"
                >
                    <img src={close} alt="" />
                </span>
                <img src={pop} alt="chains" />
                <h4>
                    {notify
                        ? "Stay up to date!"
                        : "50M Staking Limit is reached!"}
                </h4>
                <p>
                    {notify
                        ? "Subscribe to be first to know when new XPNET staking is available on BSC"
                        : "Good news that more tokens are coming on BSC. Subscribe to get notified."}
                </p>
                {!notify && (
                    <div className="btns">
                        <button
                            onClick={handleClickOnNOtifyMe}
                            className="stakeBtn"
                        >
                            Notify me
                        </button>
                        <button
                            onClick={handleClickOnClaim}
                            className="changeWalletBtn"
                        >
                            Claim XPNET
                        </button>
                    </div>
                )}
                {notify ? (
                    <div className="notify-email__container">
                        <input
                            value={input}
                            onChange={(e) => handleInput(e.target.value)}
                            type="mail"
                            placeholder="Enter your email"
                        />
                        <button
                            onClick={onNotifyClick}
                            className={`notify-btn${
                                !validMail ? "--disabled" : ""
                            }`}
                        >
                            Notify me
                        </button>
                    </div>
                ) : (
                    <button onClick={handleClickOnStake} className="algoBtnPop">
                        <img src={algo} alt="algo" />
                        Stake XPNET on Algorand now!
                    </button>
                )}
            </div>
        </div>
    );
}
