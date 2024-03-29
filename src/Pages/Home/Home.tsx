/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import algorand from "../../assets/images/Algorand.svg";
import bsc from "../../assets/images/BSC.svg";
import bg from "../../assets/images/desk/bg.png";
import bgMob from "../../assets/images/mob/mobg.png";
import classNames from "classnames";
import {
    BLOCKCHAINS,
    STAKING_LIMIT_ALGO,
    TOTAL_STAKED_BSC,
    XPNET,
} from "../../assets/ts/Consts";
import { addCommas } from "../../assets/ts/helpers";
import { ProgressBar } from "../../Components/ProgressBar/ProgressBar";
import "./home.scss";
import { useSelector } from "react-redux";
import { ReduxState } from "../../store/store";
import { useDispatch } from "react-redux";
import {
    //setAlgoRewards,
    //setBalance,
    setBlockchain,
    setConnectModalShow,
    setErrorModal,
    //setEVMStakesArray,
    //setFetchedAlgoStakes,
    setLimitModal,
    setNavigateRoute,
    //setXPNetPrice,
} from "../../store/reducer/homePageSlice";
import {
    //getAllAlgoStakes,
    getTokenStaked,
    //getXpNetBalance,
} from "../../assets/ts/algoUtils";
/*import { createPortal } from "react-dom";
import ConnectModalBody from "../../Components/Modals/ConnectModalBody";
import { getTokenOfOwnerByIndex } from "../../assets/ts/evmUtils";
import { StakingHistory } from "../../Components/StakingHistory/StakingHistory";*/

interface HomeProps {}

export const Home: FC<HomeProps> = () => {
    const [totalStakeInAlgo, setTotalStakeInAlgo] = useState(0);
    // const [balanceInt, setBalanceInt] = useState<number>()
    //const balanceInt = useRef<number | null>(null);
    const {
        account,
        evmAccount,

        balance,
        evmStakesArray,
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
        // debugger;
        if (typeOfStake === "ALGO") {
            if (!account) {
                dispatch(setNavigateRoute("/stake"));
                dispatch(setBlockchain(BLOCKCHAINS[0]));
                dispatch(setConnectModalShow(true));
            } //else if (account && !balance) dispatch(setErrorModal(true));
            else {
                handleBlockchainSelect(typeOfStake);
                navigate("/stake");
            }
        } else {
            // handleBlockchainSelect(typeOfStake);
            dispatch(setLimitModal(true));
            // dispatch(setNavigateRoute("/stake"));
        }
    };

    const handleClickOnClaim = (typeOfClaim: string) => {
        if (typeOfClaim === "ALGO" ? account : evmAccount) {
            if (!balance) dispatch(setErrorModal(true));
            else navigate(`/rewards${location.search}`);
        } else {
            if (evmStakesArray.length < 0) {
                dispatch(setLimitModal(true));
            } else {
                handleBlockchainSelect(typeOfClaim);
                dispatch(setConnectModalShow(true));
                dispatch(setNavigateRoute(`/rewards${location.search}`));
            }
        }
    };

    useEffect(() => {
        document.body.style.backgroundImage = `url(${
            window.innerWidth > 600 ? bg : bgMob
        })`;
        const getTotal = async () => {
            const staked = await getTokenStaked();
            setTotalStakeInAlgo(staked);
        };
        getTotal();
        return () => {
            document.body.style.backgroundImage = "none";
        };
    }, []);

    return (
        <>
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
