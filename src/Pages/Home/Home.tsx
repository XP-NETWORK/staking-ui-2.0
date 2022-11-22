/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import algorand from "../../assets/images/Algorand.svg";
import bsc from "../../assets/images/BSC.svg";
import bg from "../../assets/images/desk/bg.png";
import bgMob from "../../assets/images/mob/bg.png";

import classNames from "classnames";

import {
    STAKING_LIMIT_ALGO,
    TOTAL_STAKED_BSC,
    XPNET,
} from "../../assets/ts/Consts";
import { addCommas } from "../../assets/ts/helpers";

import { ProgressBar } from "../../Components/ProgressBar/ProgressBar";

import "./home.scss";
import { useSelector } from "react-redux";
import { ReduxState } from "../../store/store";

interface Props {}

export const Home: FC<Props> = () => {
    const [totalStakeInAlgo, settotalStakeInAlgo] = useState(1);
    const blockchain = useSelector(
        (state: ReduxState) => state.homePage.blockchain
    ).chain;

    const navigate = useNavigate();

    const handleClickOnStake = (typeOfStake: string) => {
        switch (typeOfStake) {
            case "EVM":
                navigate("/limit");
                break;
            case "ALGO":
                navigate("/connect/stake");
                break;
            default:
                break;
        }
    };
    // const handleAlgoClaimXPNET = () => {
    //     navigate("/connect/rewards");
    // };

    const handleClickOnClaim = (typeOfClaim: string) => {
        switch (typeOfClaim) {
            case "EVM":
                navigate("/connect/evm-rewards");
                break;
            case "ALGO":
                navigate("/connect/rewards");
                break;
            default:
                break;
        }
    };

    return (
        <>
            {/* <div className="homeWrapperMargin"> */}
            <img src={bg} className={classNames("bg", "deskOnly")} alt="bg" />
            <img src={bgMob} className={classNames("bg", "mobOnly")} alt="bg" />
            <div className="homeWrapper">
                <div>
                    <h1>Do more with XPNET</h1>
                    <p>
                        Delegate XPNET to validators to earn rewards and mint a
                        chain-agnostic NFT for free.
                    </p>
                </div>
                <div className="stakingBoxesWrapper">
                    <div className="box">
                        <label className="newStaking">
                            New staking opportunities
                        </label>
                        <div className="title">
                            <label>
                                <img src={algorand} alt="algo_img" />
                                Algorand
                            </label>
                            <div
                                className={classNames(
                                    "btnsContainer",
                                    "deskOnly"
                                )}
                            >
                                <button
                                    className="whiteBtn"
                                    onClick={() => handleClickOnStake("ALGO")}
                                >
                                    Stake XPNET
                                </button>
                                <button
                                    className="darkBtn"
                                    onClick={() => handleClickOnClaim("ALGO")}
                                >
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
                        />
                        <div className={classNames("btnsContainer", "mobOnly")}>
                            <button
                                className="whiteBtn"
                                onClick={() => handleClickOnStake("ALGO")}
                            >
                                Stake XPNET
                            </button>
                            <button
                                className="darkBtn"
                                onClick={() => handleClickOnClaim("ALGO")}
                            >
                                Claim XPNET
                            </button>
                        </div>
                    </div>

                    <div className="box">
                        <div className="title">
                            <label>
                                <img src={bsc} alt="bsc_img" />
                                BSC
                            </label>
                            <div
                                className={classNames(
                                    "btnsContainer",
                                    "deskOnly"
                                )}
                            >
                                <button
                                    className="whiteBtn"
                                    onClick={() => handleClickOnStake("EVM")}
                                >
                                    Stake XPNET
                                </button>
                                <button
                                    className="darkBtn"
                                    onClick={() => handleClickOnClaim("EVM")}
                                >
                                    Claim XPNET
                                </button>
                            </div>
                        </div>
                        <div className="stakingLimit">
                            Staking Limit
                            <span>
                                {addCommas(TOTAL_STAKED_BSC)} {XPNET}
                            </span>
                        </div>
                        <ProgressBar
                            totalStaking={TOTAL_STAKED_BSC}
                            stakingLimit={TOTAL_STAKED_BSC}
                        />
                        <div className={classNames("btnsContainer", "mobOnly")}>
                            <button
                                className="whiteBtn"
                                onClick={() => handleClickOnStake("EVM")}
                            >
                                Stake XPNET
                            </button>
                            <button
                                className="darkBtn"
                                onClick={() => handleClickOnClaim("EVM")}
                            >
                                Claim XPNET
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* </div> */}
        </>
    );
};
