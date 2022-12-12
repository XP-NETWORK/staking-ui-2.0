import React, { useRef } from "react";
import wallet from "../../assets/images/wallet.svg";
import close from "../../assets/images/close-icon.svg";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { ReduxState } from "../../store/store";
import { wagmiClient } from "../Wallets/walletConnectors";
import { WagmiConfig } from "wagmi";
import MetaMask from "../Wallets/MetaMask";
import WalletConnect from "../Wallets/WalletConnect";
import Pera from "../Wallets/Pera";
import MyAlgo from "../Wallets/MyAlgo";
import AlgoSigner from "../Wallets/AlgoSigner";
import { useOnClickOutside } from "../../assets/ts/helpers";
import { useDispatch } from "react-redux";
import { setConnectModalShow } from "../../store/reducer/homePageSlice";

interface Props {}

export default function ConnectModalBody({}: Props) {
    const dispatch = useDispatch();
    const { blockchain } = useSelector((state: ReduxState) => state.homePage);

    const ref = React.useRef<HTMLInputElement>(null);
    useOnClickOutside(ref, () => dispatch(setConnectModalShow(false)));

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
                zIndex: "99",
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
                <div className="connectBtns">
                    {blockchain?.chain === "BSC" ? (
                        <>
                            <WagmiConfig client={wagmiClient}>
                                <MetaMask />
                                <WalletConnect />
                            </WagmiConfig>
                        </>
                    ) : (
                        <>
                            <Pera />
                            <MyAlgo />
                            <AlgoSigner />
                        </>
                    )}
                </div>
                <p>
                    By connecting a wallet, you agree to XPNET’s{" "}
                    <span>Terms of Service</span> and acknowledge that you have
                    read and understand the{" "}
                    <span>XPNET protocol disclaimer</span>.
                </p>
            </div>
        </div>
    );
}
