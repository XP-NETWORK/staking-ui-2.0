import React from "react";

interface Props {}

export default function ErrorModalBody({}: Props) {
    const mobile = window.innerWidth < 600;

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
            {/* <div className="errorWraper">
                <h4>Oh nooooo</h4>
                <p>Seems you don’t have any XPNET staked.</p>
                <div className="btns">
                    <button className="stakeBtn">Stake XPNET</button>
                    <button
                        className="changeWalletBtn"
                        // onClick={() => navigate("/")}
                    >
                        Change wallet
                    </button>
                </div>
            </div> */}
            <div className="errorWraper">
                <h4>Oh nooooo</h4>
                <p>Seems you don’t have any XPNET to stake.</p>
                <div className="btns">
                    <button className="stakeBtn">Stake XPNET</button>
                    <button
                        className="changeWalletBtn"
                        // onClick={() => navigate("/")}
                    >
                        Change wallet
                    </button>
                    <button
                        className="changeWalletBtn"
                        // onClick={() => navigate("/")}
                    >
                        XPNET Bridge
                    </button>
                </div>
            </div>
        </div>
    );
}
