import React, { FC, useEffect, useRef, useState } from "react";
import { jsNumberForAddress } from "react-jazzicon";
import Jazzicon from "react-jazzicon/dist/Jazzicon";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useOnClickOutside } from "../../assets/ts/helpers";
import { setShowAccountMenu } from "../../store/reducer/homePageSlice";
import { ReduxState } from "../../store/store";
import { Close } from "../Buttons/Close";
import { Copy } from "../Buttons/Copy";

interface Props {
    func: any;
    // account: string
    // evmAccount: string
}

export const AccountMenu: FC<Props> = () => {
    const dispatch = useDispatch();
    const ref = useRef(null);
    const { account, evmAccount, blockchain } = useSelector(
        (state: ReduxState) => state.homePage
    );
    const show = true;
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
    const handleCloseAccountMenu = () => {
        dispatch(setShowAccountMenu(false));
    };

    const handlClickOnDisconnect = () => {
        document.location.reload();
    };

    useOnClickOutside(ref, handleCloseAccountMenu);

    return (
        show && (
            <div ref={ref} className="account-menu__container">
                <div className="account-header">
                    <span>Account</span>
                    <Close func={handleCloseAccountMenu} />
                </div>
                <div className="line"></div>
                <div className="account-connected-wallet">
                    Connected with MetaMask
                </div>
                <div className="account-actions">
                    <Jazzicon
                        diameter={20}
                        seed={jsNumberForAddress(account)}
                    />
                    <div className="account-format">{formatAccount()}</div>
                    <Copy address={account} />
                </div>
                <div
                    onClick={handlClickOnDisconnect}
                    className="disconnect-btn"
                >
                    Disconnect
                </div>
            </div>
        )
    );
};
