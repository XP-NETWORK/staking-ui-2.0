import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { BLOCKCHAINS } from "../../assets/ts/Consts";
import { setBlockchain } from "../../store/reducer/homePageSlice";
import { ReduxState } from "../../store/store";
import "../ConnectedAccountNavbar/activeAccountNavbar.scss";

export default function AccountChainNav() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const homePath = window.location.pathname;
    const { account, blockchain, evmAccount, evmStakes } = useSelector(
        (state: ReduxState) => state.homePage
    );

    const [showDrop, setShowDrop] = useState(false);

    const handleChangeChain = (chain: string) => {
        let newblockchain = BLOCKCHAINS.find((c) => c.chain === chain);
        dispatch(setBlockchain(newblockchain));
        setShowDrop(false);
        // debugger;
        switch (homePath) {
            case "/stake":
                switch (chain) {
                    case "BSC":
                        if (!evmAccount) navigate("/connect");
                        else if (evmAccount) navigate("/limit");
                        break;
                    default:
                        break;
                }
                break;
            case "/limit":
                switch (chain) {
                    case "Algorand":
                        if (!account) navigate("/connect");
                        else if (account) navigate("/stake");
                        break;
                    default:
                        break;
                }
                break;
            case "/error":
                switch (chain) {
                    case "Algorand":
                        if (!account) navigate("/connect");
                        else if (account) navigate("/stake");
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
            {blockchain.chain}
        </div>
    );
    return (
        <div className="chainAndAccountContainer">
            <div className="dropWraper">
                <button
                    style={{
                        pointerEvents:
                            homePath === "/" && !evmAccount ? "none" : "auto",
                    }}
                    onClick={() => setShowDrop(!showDrop)}
                    className="dropdown"
                >
                    {title}
                </button>

                {showDrop && (
                    <div className="item">
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
                {/* <Jazzicon diameter={16} address={`${account}`} /> */}
                {formatAccount()}
            </label>

            <label className={classNames("account", "mobOnly")}>
                {/* <Jazzicon diameter={16} address={`${account}`} /> */}
                {formatAccount()}
            </label>
        </div>
    );
}
