import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setShowNotifyModal } from "../../store/reducer/homePageSlice";
import close from "../../assets/images/close-icon.svg";
import { useOnClickOutside } from "../../assets/ts/helpers";
import pop from "../../assets/images/coin/pop.svg";

export default function NotifyFormBody() {
    const mobile = window.innerWidth < 600;
    const [input, setInput] = useState("");

    const ref = useRef();
    useOnClickOutside(ref, () => dispatch(setShowNotifyModal(false)));
    const dispatch = useDispatch();

    const onNotifyClick = async () => {
        //todo post request
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
            <div ref={ref} className="errorWraper">
                <span
                    onClick={() => dispatch(setShowNotifyModal(false))}
                    className="errorWraper-close"
                >
                    <img src={close} alt="" />
                </span>
                <img style={{ height: "46px" }} src={pop} alt="chains" />
                <h4>Stay up to date</h4>
                <p>
                    Subscribe to be first to know when new XPNET staking is
                    available on BSC
                </p>
                <div className="notify-email__container">
                    <input
                        onChange={(e) => setInput(e.target.value)}
                        type="mail"
                        placeholder="Enter your email"
                    />
                    <button onClick={onNotifyClick} className="stakeBtn btn">
                        Notify me
                    </button>
                </div>
            </div>
        </div>
    );
}
