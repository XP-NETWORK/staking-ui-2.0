import classNames from "classnames";
import React, { FC, useState } from "react";
import { useDispatch } from "react-redux";

import algorand from "../../assets/images/Algorand.svg";
import { STAKING_LIMIT_ALGO, XPNET } from "../../assets/ts/Consts";
import { addCommas } from "../../assets/ts/helpers";
import { setNavigateRoute } from "../../store/reducer/homePageSlice";
import { ProgressBar } from "../ProgressBar/ProgressBar";

interface Props {
    totalStakeInAlgo: number;
}

export const MainAlgorandBox: FC<Props> = ({ totalStakeInAlgo }) => {
    const dispatch = useDispatch();

    const handleClickOnClaim = () => {
        // if (typeOfClaim === "ALGO" ? account : evmAccount) {
        //     if (!balance) dispatch(setErrorModal(true));
        //     else navigate("/rewards");
        // } else {
        //     if (evmStakesArray.length < 0) {
        //         dispatch(setLimitModal(true));
        //     } else {
        //         // handleBlockchainSelect(typeOfClaim);
        //         dispatch(
        //             setConnectModalShow({ visible: true, network: "BSC" })
        //         );
        //         dispatch(setNavigateRoute("/rewards"));
        //     }
        // }
    };

    const handleClickOnStake = () => {
        dispatch(setNavigateRoute("/stake"));

        // debugger;
        // if (typeOfStake === "ALGO") {
        //     if (!account) {
        //         dispatch(setNavigateRoute("/stake"));
        //         dispatch(setBlockchain(BLOCKCHAINS[0]));
        //         dispatch(
        //             setConnectModalShow({ visible: true, network: "Algorand" })
        //         );
        //     } else if (account && !balance) dispatch(setErrorModal(true));
        //     else {
        //         handleBlockchainSelect(typeOfStake);
        //         navigate("/stake");
        //     }
        // } else {
        //     // handleBlockchainSelect(typeOfStake);
        //     dispatch(setLimitModal(true));
        //     // dispatch(setNavigateRoute("/stake"));
        // }
    };

    return (
        <div className="box">
            <label className="newStaking">New staking opportunities</label>
            <div className="title">
                <label>
                    <img src={algorand} alt="algo_img" />
                    Algorand
                </label>
                <div className={classNames("btnsContainer", "deskOnly")}>
                    <button className="whiteBtn" onClick={handleClickOnStake}>
                        Stake XPNET
                    </button>
                    <button className="darkBtn" onClick={handleClickOnClaim}>
                        Claim XPNET
                    </button>
                </div>
            </div>
            <div className="stakingLimit">
                Staking Limit
                <span>
                    {addCommas(STAKING_LIMIT_ALGO)} {XPNET}
                </span>
            </div>
            <ProgressBar
                totalStaking={totalStakeInAlgo}
                stakingLimit={STAKING_LIMIT_ALGO}
                chain={"algo"}
            />
            <div className={classNames("btnsContainer", "mobOnly")}>
                <button className="whiteBtn" onClick={handleClickOnClaim}>
                    Stake XPNET
                </button>
                <button className="darkBtn" onClick={handleClickOnClaim}>
                    Claim XPNET
                </button>
            </div>
        </div>
    );
};
