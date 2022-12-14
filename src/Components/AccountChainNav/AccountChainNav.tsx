import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useHref, useNavigate } from "react-router";
import { BLOCKCHAINS } from "../../assets/ts/Consts";
import {
    setBlockchain,
    setConnectedWallet,
    setConnectModalShow,
    setLimitModal,
} from "../../store/reducer/homePageSlice";
import { ReduxState } from "../../store/store";
import "../ConnectedAccountNavbar/activeAccountNavbar.scss";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";
import { useOnClickOutside } from "../../assets/ts/helpers";

export default function AccountChainNav() {
    const ref = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const homePath = window.location.pathname;
    const { account, blockchain, evmAccount, evmStakes } = useSelector(
        (state: ReduxState) => state.homePage
    );

    const [showDrop, setShowDrop] = useState(false);

    useOnClickOutside(ref, () => setShowDrop(!showDrop));

    const handleChangeChain = (chain: string) => {
        // debugger;

        setShowDrop(false);
        switch (homePath) {
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
                        dispatch(setBlockchain(BLOCKCHAINS[1]));
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

    // useEffect(() => {
    //     if (account && !evmAccount) {
    //         handleChangeChain("Algorand");
    //     } else if (!account && evmAccount) {
    //         handleChangeChain("BSC");
    //     } else {
    //         handleChangeChain("Algorand");
    //     }
    // }, [account, evmAccount]);

    let title = (
        <div className="ddItem">
            <img src={blockchain.img} alt={blockchain.img} />
        </div>
    );

    const buttonEvents = () => {
        if (showDrop) {
            return "none";
        } else if (homePath === "/" && !evmAccount) {
            return "none";
        } else return "auto";
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

            <label className={classNames("account", "deskOnly")}>
                {formatAccount()}
                <Jazzicon diameter={16} seed={jsNumberForAddress(account)} />
            </label>

            <label className={classNames("account", "mobOnly")}>
                {formatAccount()}
                <Jazzicon diameter={16} seed={jsNumberForAddress(account)} />
            </label>
        </div>
    );
}
