/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useEffect, useState, ReactNode, useRef } from "react";
import { useNavigate } from "react-router";
import algorand from "../../assets/images/Algorand.svg";
import bsc from "../../assets/images/BSC.svg";
import bg from "../../assets/images/desk/bg.png";
import bgMob from "../../assets/images/mob/bg.png";
import classNames from "classnames";
import {
    BLOCKCHAINS,
    STAKING_LIMIT_ALGO,
    TOTAL_STAKED_BSC,
    XPNET,
} from "../../assets/ts/Consts";
import { addCommas, getCurrentPrice } from "../../assets/ts/helpers";
import { ProgressBar } from "../../Components/ProgressBar/ProgressBar";
import "./home.scss";
import { useSelector } from "react-redux";
import { ReduxState } from "../../store/store";
import { useDispatch } from "react-redux";
import {
    setAlgoRewards,
    setBalance,
    setBlockchain,
    setConnectModalShow,
    setErrorModal,
    setEVMStakesArray,
    setFetchedAlgoStakes,
    setNavigateRoute,
    setXPNetPrice,
} from "../../store/reducer/homePageSlice";
import {
    getAlgoReward,
    getAllAlgoStakes,
    getTokenStaked,
    getXpNetBalance,
} from "../../assets/ts/algoUtils";
import { createPortal } from "react-dom";
import ConnectModalBody from "../../Components/Modals/ConnectModalBody";
import { getTokenOfOwnerByIndex } from "../../assets/ts/evmUtils";

interface HomeProps {}

export const Home: FC<HomeProps> = () => {
    const [totalStakeInAlgo, setTotalStakeInAlgo] = useState(0);

    const {
        evmStakes,
        blockchain,
        account,
        evmAccount,
        stakingClient,
        fetchedAlgoStakes,
        balance,
    } = useSelector((state: ReduxState) => state.homePage);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleBlockchainSelect = (chan: string) => {
        switch (chan) {
            case "EVM":
                dispatch(setBlockchain(BLOCKCHAINS[1]));
                break;
            case "ALGO":
                dispatch(setBlockchain(BLOCKCHAINS[0]));
                break;
            default:
                break;
        }
    };

    const handleClickOnStake = (typeOfStake: string) => {
        debugger;
        if (typeOfStake === "ALGO" ? account : evmAccount) {
            if (!balance) dispatch(setErrorModal(true));
            else {
                handleBlockchainSelect(typeOfStake);
                navigate("/stake");
            }
        } else {
            handleBlockchainSelect(typeOfStake);
            dispatch(setConnectModalShow(true));
            dispatch(setNavigateRoute("/stake"));
        }
    };

    const handleClickOnClaim = (typeOfClaim: string) => {
        if (typeOfClaim === "ALGO" ? account : evmAccount) {
            if (!balance) dispatch(setErrorModal(true));
            else navigate("/rewards");
        } else {
            handleBlockchainSelect(typeOfClaim);
            dispatch(setConnectModalShow(true));
            dispatch(setNavigateRoute("/rewards"));
        }
    };

    useEffect(() => {
        const getBalance = async () => {
            const balance = await getXpNetBalance(stakingClient);
            balance
                ? dispatch(setBalance(balance))
                : dispatch(setErrorModal(true));
            dispatch(setBalance(balance));
        };
        if (account) getBalance().catch(console.error);
        const getCurrency = async () => {
            let currency = await getCurrentPrice();
            dispatch(setXPNetPrice(currency));
        };
        getCurrency().catch(console.error);

        let rewardsInt: any;
        let stakesInt: any;
        const algoRewardsAndStakes = async () => {
            let rewards = await getAlgoReward(account);
            if (!rewards) {
                rewardsInt = setInterval(
                    async () => (rewards = await getAlgoReward(account)),
                    200
                );
            } else if (rewards) {
                dispatch(setAlgoRewards(rewards));
                clearInterval(rewardsInt);
            }
            let stakes = await getAllAlgoStakes(account);
            if (fetchedAlgoStakes?.length !== stakes?.length)
                dispatch(setFetchedAlgoStakes(stakes));
            if (!stakes) {
                stakesInt = setInterval(
                    async () => (stakes = await getAlgoReward(account)),
                    200
                );
            } else if (stakes) {
                dispatch(setAlgoRewards(rewards));
                clearInterval(stakesInt);
            }
        };
        if (account) {
            algoRewardsAndStakes();
        }
        const getEVMStakes = async (evmStakes: any) => {
            const tokens = await getTokenOfOwnerByIndex(evmStakes, evmAccount);
            dispatch(setEVMStakesArray(tokens));
        };
        if (blockchain.chain === "BSC" && evmStakes) {
            getEVMStakes(evmStakes);
        }

        return () => {
            clearInterval(rewardsInt);
            clearInterval(stakesInt);
        };
    }, [stakingClient]);

    useEffect(() => {
        const getTotal = async () => {
            const staked = await getTokenStaked();
            setTotalStakeInAlgo(staked);
        };
        getTotal();
    }, []);

    return (
        <>
            {/* <div id="modal-root"></div> */}
            {/* {showConnectModal && (
                <ConnectModal>
                    <ConnectModalBody />
                </ConnectModal>
            )} */}
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
                            chain={"algo"}
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
                            chain={"BSC"}
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
        </>
    );
};
