import React from "react";
import wallet from "../../assets/images/wallet.svg";
import close from "../../assets/images/close-icon.svg";

import { useSelector } from "react-redux";
import { ReduxState } from "../../store/store";

import { useOnClickOutside } from "../../assets/ts/helpers";
import { useDispatch } from "react-redux";
import { setConnectModalShow } from "../../store/reducer/homePageSlice";
import "./../../Components/Connect/connect.scss";
import PDF from "../../assets/Terms.pdf";
import { AlgorandWallets } from "../Wallets/AlgorandWallets";
import { EVMWallets } from "../Wallets/EVMWallets";

export default function ConnectModalBody() {
    const dispatch = useDispatch();
    const { blockchain, networkConnection } = useSelector(
        (state: ReduxState) => state.homePage
    );

    const ref = React.useRef<HTMLInputElement>(null);
    useOnClickOutside(ref, () => dispatch(setConnectModalShow(false)));

    const mobile = window.innerWidth < 600;

    const checkNetwork = () => {
        console.log({});

        if (networkConnection) {
            switch (networkConnection) {
                case "Algorand":
                    return <AlgorandWallets />;
                case "BSC":
                    return <EVMWallets />;

                default:
                    break;
            }
        } else {
            return (
                <div className="connectBtns">
                    {blockchain?.chain === "BSC" ? (
                        <EVMWallets />
                    ) : (
                        <AlgorandWallets />
                    )}
                </div>
            );
        }
    };

    return (
        <div
            className="connect-modal"
            style={{
                position: "fixed",
                left: "0px",
                top: mobile ? "-20px" : "0",
                display: "grid",
                placeItems: "center",
                height: "110%",
                width: "100%",
                backdropFilter: "blur(15px)",
                zIndex: "59",
            }}
        >
            <div ref={ref} className="connectWraper">
                <div className="connectHeader">
                    <label>
                        <img src={wallet} />
                        Connect a wallet
                    </label>
                    <img
                        src={close}
                        onClick={() => dispatch(setConnectModalShow(false))}
                        alt=""
                    />
                </div>
                <div className="connectBtns">{checkNetwork()}</div>
                <p>
                    By connecting a wallet, you acknowledge that you read,
                    understand, and agree to XPNET's
                    <span>
                        {" "}
                        <a href={PDF} target="_blank" rel="noreferrer">
                            Terms of Service
                        </a>
                    </span>
                    .
                </p>
            </div>
        </div>
    );
}
