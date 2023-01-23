import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { assetIdx, subAppId } from "../../assets/ts/Consts";
import { getCurrentPrice } from "../../assets/ts/helpers";
import { Navigate, useNavigate } from "react-router-dom";
import { ReduxState } from "../../store/store";
import { HOCClaimRewards } from "./HOCClaimRewards";
import "./claimRewards.scss";
// import { getTokenOfOwnerByIndex } from "../../assets/ts/evmUtils";
import { useDispatch } from "react-redux";
import {
    setAlgoRewards,
    setBalance,
    setErrorModal,
    setEVMStakesArray,
    setFetchedAlgoStakes,
    setXPNetPrice,
} from "../../store/reducer/homePageSlice";
import { ThreeCircles } from "react-loader-spinner";
import {
    createClient,
    getAlgoReward,
    getAllAlgoStakes,
    getXpNetBalance,
} from "../../assets/ts/algoUtils";
import { NFTRewards } from "../../Components/Rewards/NFTRewards";
import RewardsDetails from "../../Components/Rewards/RewardsDetails";
import AlgoRewardsDetails from "../../Components/Rewards/AlgoRewardsDetails";
import { AlgoNFTRewards } from "../../Components/Rewards/AlgoNFTRewards";

interface Props {
    chain: string;
}

const ClaimRewards = ({ chain }: Props) => {
    console.log("🚀 ~ file: ClaimRewards.tsx:34 ~ ClaimRewards ~ chain", chain);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [indexOfStake, setIndexOfStake] = useState(0);
    const [indexOfAlgoStake, setIndexOfAlgoStake] = useState(0);
    let timeOut = useRef();
    const {
        account,
        evmAccount,
        evmStakesArray,
        fetchedAlgoStakes,
        algoRewards,
        activeSessionStakes,
        blockchain,
        evmStakes,
        stakingClient,
        refreshTheAlgoRewards,
    } = useSelector((state: ReduxState) => state.homePage);

    const showLoader = () => {
        switch (blockchain.chain) {
            case "BSC":
                if (evmAccount) {
                    if (evmStakesArray.length > 0) return false;
                    else return true;
                }
                break;
            case "Algorand":
                if (account) {
                    if (fetchedAlgoStakes.length > 0 && algoRewards.length > 0)
                        return false;
                    else return true;
                }
                break;
            default:
                break;
        }

        if (
            (fetchedAlgoStakes.length > 0 && algoRewards.length > 0) ||
            evmStakesArray.length > 0
        ) {
            return false;
        } else return true;
    };

    useEffect(() => {
        const getBalance = async () => {
            const balance = await getXpNetBalance(stakingClient);
            if (balance) dispatch(setBalance(balance));
            else if (balance) {
                // dispatch(setErrorModal(true));
                console.log("Oh nooooooo");
            }
        };
        if (account) {
            getBalance().catch(console.error);
        }
    }, [stakingClient, activeSessionStakes, account]);

    useEffect(() => {
        const t = setTimeout(() => {
            // debugger;
            switch (blockchain.chain) {
                case "BSC":
                    if (evmStakesArray.length === 0) {
                        navigate("/");
                        dispatch(setErrorModal("evmError"));
                    }
                    break;
                case "Algorand":
                    if (fetchedAlgoStakes.length === 0) {
                        navigate("/");
                        dispatch(setErrorModal(true));
                    }
                    break;
                default:
                    break;
            }
        }, 10000);
        return () => clearTimeout(t);
    }, [blockchain, evmStakesArray, fetchedAlgoStakes, navigate]);

    useEffect(() => {
        const getCurrency = async () => {
            let currency = await getCurrentPrice();
            dispatch(setXPNetPrice(currency));
        };
        getCurrency().catch(console.error);
    }, [chain, evmAccount, evmStakes]);

    useEffect(() => {
        let rewardsInt: any;
        let stakesInt: any;
        const algoRewardsAndStakes = async () => {
            let rewards = await getAlgoReward(account);
            rewardsInt = setInterval(
                async () => (rewards = await getAlgoReward(account)),
                200
            );
            dispatch(setAlgoRewards(rewards));
            clearInterval(rewardsInt);
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
    }, [refreshTheAlgoRewards]);

    if (!account && !evmAccount) return <Navigate to="/" replace />;
    return !showLoader() ? (
        <div className="stakeWrapper">
            {chain === "Algorand" ? (
                <>
                    <AlgoRewardsDetails
                        rewards={algoRewards}
                        sessionStakes={activeSessionStakes}
                        stakes={fetchedAlgoStakes}
                        stakeIndex={indexOfAlgoStake}
                    />
                    <AlgoNFTRewards
                        stakes={fetchedAlgoStakes}
                        selectedStakeIndex={indexOfAlgoStake}
                        setIndex={setIndexOfAlgoStake}
                    />
                </>
            ) : (
                <>
                    <RewardsDetails stake={evmStakesArray[indexOfStake]} />
                    <NFTRewards
                        stakes={evmStakesArray}
                        setIndex={setIndexOfStake}
                        algoStakes={fetchedAlgoStakes}
                        selectedStakeIndex={indexOfStake}
                    />
                </>
            )}
        </div>
    ) : (
        <div className="claim-rewards-loader">
            {/* <div onClick={handleUnstake}>unstake</div> */}
            <ThreeCircles
                height="100"
                width="100"
                color="#E22440"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel="three-circles-rotating"
                outerCircleColor=""
                innerCircleColor=""
                middleCircleColor=""
            />
        </div>
    );
};

export default HOCClaimRewards(ClaimRewards);
