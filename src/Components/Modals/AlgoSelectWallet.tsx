import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { ReduxState } from "../../store/store";
import { setAlgoSelectWallet } from "../../store/reducer/homePageSlice";

import { StringShortener } from "../../utils";

export const AlgoSelectWallet = ({
    algoSelectWallet,
}: {
    algoSelectWallet: [];
}) => {
    const mobile = window.innerWidth < 600;
    const dispatch = useDispatch();
    const { algoSelecWalletPromise } = useSelector(
        (state: ReduxState) => state.homePage
    );

    const handleClick = (item: any) => {
        algoSelecWalletPromise && algoSelecWalletPromise(item.address);
        dispatch(setAlgoSelectWallet(undefined));
    };

    return (
        <div
            className="connect-modal algoSelector"
            style={{
                position: "fixed",
                left: "0px",
                top: mobile ? "-20px" : "0px",

                display: "grid",
                placeItems: "center",
                height: "110%",
                width: "100%",
                backdropFilter: "blur(15px)",
                zIndex: "59",
            }}
        >
            <ul>
                <h2>Select your AlgoSigner Wallet</h2>
                {algoSelectWallet.map((item: any, i) => (
                    <li
                        onClick={() => handleClick(item)}
                        key={`algoWallet-${i}`}
                    >
                        {StringShortener(item.address, 20)}
                    </li>
                ))}
            </ul>
        </div>
    );
};
