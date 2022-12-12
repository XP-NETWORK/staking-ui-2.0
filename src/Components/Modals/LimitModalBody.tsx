import React from "react";
import pop from "../../assets/images/coin/pop.svg";
import algo from "../../assets/images/coin/algo1.svg";
import { useSelector } from "react-redux";
import { ReduxState } from "../../store/store";
import close from "../../assets/images/close-icon.svg";
import { setLimitModal } from "../../store/reducer/homePageSlice";
import { useDispatch } from "react-redux";

interface Props {}

export default function LimitModalBody({}: Props) {
    const mobile = window.innerWidth < 600;
    const dispatch = useDispatch();
    const { evmStakesArray } = useSelector(
        (state: ReduxState) => state.homePage
    );

    const claimBtnStyle: React.CSSProperties = {
        pointerEvents: evmStakesArray.length > 0 ? "auto" : "none",
    };

    return (
        <div
            className="connect-modal"
            style={{
                position: "fixed",
                left: "0px",
                top: mobile ? "-20px" : "60px",
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
                <h4>50M Staking Limit is reached!</h4>
                <p>
                    Good news that more tokens are coming on BSC. Subscribe to
                    get notified.
                </p>
                <div className="btns">
                    <button className="stakeBtn">Notify me</button>
                    <button style={claimBtnStyle} className="changeWalletBtn">
                        Claim XPNET
                    </button>
                </div>
                <button className="algoBtnPop">
                    <img src={algo} alt="algo" />
                    Stake XPNET on Algorand now!
                </button>
            </div>
        </div>
    );
}
