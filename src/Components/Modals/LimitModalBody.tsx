import React, { useState } from "react";
import pop from "../../assets/images/coin/pop.svg";
import mailbox from "../../assets/images/coin/mailbox.svg";

import algo from "../../assets/images/coin/algo1.svg";
import { useSelector } from "react-redux";
import { ReduxState } from "../../store/store";
import close from "../../assets/images/close-icon.svg";
import {
    setBlockchain,
    setConnectModalShow,
    setLimitModal,
} from "../../store/reducer/homePageSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { BLOCKCHAINS } from "../../assets/ts/Consts";
import "../../Components/StakingLimitPopup/stakingLimitPopup.scss";
import axios from "axios";

import { useOnClickOutside } from "../../assets/ts/helpers";

export default function LimitModalBody() {
    const mobile = window.innerWidth < 600;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [notify, setNotify] = useState(false);
    const [validMail, setValidMail] = useState(false);
    const { evmAccount, account } = useSelector(
        (state: ReduxState) => state.homePage
    );
    const [input, setInput] = useState("");
    const [sent, setSent] = useState(false);

    const ref = React.useRef<HTMLInputElement>(null);
    useOnClickOutside(ref, () => dispatch(setLimitModal(false)));

    const handleClickOnStake = () => {
        if (!account) {
            dispatch(setBlockchain(BLOCKCHAINS[0]));
            dispatch(setLimitModal(false));
            dispatch(setConnectModalShow(true));
        } else {
            dispatch(setBlockchain(BLOCKCHAINS[0]));
            dispatch(setLimitModal(false));
            navigate(`/rewards${location.search}`);
        }
    };

    const handleClickOnClaim = () => {
        dispatch(setBlockchain(BLOCKCHAINS[1]));
        if (evmAccount) {
            dispatch(setLimitModal(false));

            navigate(`/rewards${location.search}`);
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
            /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
        if (!str || regex.test(str) === false) {
            setInput(str);
            setValidMail(false);
        } else {
            setInput(str);
            setValidMail(true);
        }
    };

    const show = () => {
        switch (sent) {
            case true:
                return (
                    <>
                        <img src={mailbox} alt="chains" />
                        <h4>🎉 Subscribe success</h4>
                        <p>
                            You will be first to know when new XPNET staking is
                            available on BSC
                        </p>
                        <div className="btns">
                            <button
                                onClick={() => dispatch(setLimitModal(false))}
                                className="changeWalletBtn"
                            >
                                Okay
                            </button>
                        </div>
                    </>
                );
            default:
                return (
                    <>
                        <img src={pop} alt="chains" />
                        <h4>
                            {notify
                                ? "Stay up to date!"
                                : "50M Staking Limit is reached!"}
                        </h4>
                        <p>
                            {notify
                                ? "Subscribe to be first to know when new XPNET staking is available on BSC."
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
                                    onChange={(e) =>
                                        handleInput(e.target.value)
                                    }
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
                            <button
                                onClick={handleClickOnStake}
                                className="algoBtnPop"
                            >
                                <img src={algo} alt="algo" />
                                Stake XPNET on Algorand now!
                            </button>
                        )}
                    </>
                );
        }
    };

    const onNotifyClick = async () => {
        const msg = {
            email: input,
            telegram: undefined,
            firstName: undefined,
            lastName: undefined,
        };
        try {
            await axios.post(
                "https://xpnetworkapi.herokuapp.com/stake-notify",
                msg
            );
            setSent(true);
        } catch (error) {
            console.error(error);
        }
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
                zIndex: "59",
            }}
        >
            <div ref={ref} className="limitWraper">
                <span
                    onClick={() => dispatch(setLimitModal(false))}
                    className="limitWraper-close"
                >
                    <img src={close} alt="" />
                </span>
                {show()}
            </div>
        </div>
    );
}
