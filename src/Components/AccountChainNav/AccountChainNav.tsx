import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { BLOCKCHAINS } from "../../assets/ts/Consts";
import {
    setBlockchain,
    setConnectModalShow,
    setLimitModal,
    setShowAccountMenu,
    updateNetworkConnection,
} from "../../store/reducer/homePageSlice";
import { ReduxState } from "../../store/store";
import "../ConnectedAccountNavbar/activeAccountNavbar.scss";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";
import { useOnClickOutside } from "../../assets/ts/helpers";

export default function AccountChainNav() {
    const ref = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const pathname = window.location.pathname;
    const { account, blockchain, evmAccount, showAccountMenu } = useSelector(
        (state: ReduxState) => state.homePage
    );

    const [showDrop, setShowDrop] = useState(false);

    useOnClickOutside(ref, () => setShowDrop(!showDrop));

    const handleChangeChain = (chain: string) => {
        // debugger;

        setShowDrop(false);
        switch (pathname) {
            case "/stake":
                switch (chain) {
                    case "BSC":
                        dispatch(setLimitModal(true));
                        break;
                    default:
                        break;
                }
                break;
            case "/rewards":
                switch (chain) {
                    case "Algorand":
                        dispatch(setBlockchain(BLOCKCHAINS[0]));

                        if (!account) dispatch(setConnectModalShow(true));
                        else if (account) navigate("/rewards");
                        break;
                    case "BSC":
                        dispatch(updateNetworkConnection("BSC"));
                        if (!evmAccount) {
                            dispatch(setConnectModalShow(true));
                        } else navigate("/rewards");
                        break;
                    default:
                        break;
                }
                break;
            default:
                break;
        }
    };

    const formatAccount = () => {
        switch (blockchain.chain) {
            case "Algorand":
                return `${account.slice(0, 10) + "..." + account.slice(-2)}`;
            case "BSC":
                return `${
                    evmAccount.slice(0, 10) + "..." + evmAccount.slice(-2)
                }`;
            default:
                break;
        }
    };

    const title = (
        <div className="ddItem">
            <img src={blockchain.img} alt={blockchain.img} />
        </div>
    );

    const buttonEvents = () => {
        if (showDrop) {
            return "none";
        } else if (pathname === "/" && !evmAccount) {
            return "none";
        } else return "auto";
    };

    const handleCLickOnAccount = () => {
        dispatch(setShowAccountMenu(!showAccountMenu));
    };

    return (
        <div className="chainAndAccountContainer">
            <div className="dropWraper">
                <button
                    style={{
                        pointerEvents: buttonEvents(),
                    }}
                    onClick={() => setShowDrop(!showDrop)}
                    className="dropdown"
                >
                    {title}
                </button>

                {showDrop && (
                    <div ref={ref} className="item">
                        {BLOCKCHAINS.filter(
                            (c) => c.chain !== blockchain.chain
                        ).map((c, i) => {
                            return (
                                <label
                                    key={i}
                                    id={c.chain}
                                    onClick={() => handleChangeChain(c.chain)}
                                >
                                    <img src={c.img} alt={c.chain} />
                                    {c.chain}
                                </label>
                            );
                        })}
                    </div>
                )}
            </div>
            <div
                style={{ pointerEvents: showAccountMenu ? "none" : "auto" }}
                className="account"
                onClick={handleCLickOnAccount}
            >
                {formatAccount()}
                <Jazzicon diameter={20} seed={jsNumberForAddress(account)} />
            </div>
        </div>
    );
}
