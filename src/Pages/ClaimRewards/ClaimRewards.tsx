import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { assetIdx, subAppId } from "../../assets/ts/Consts";
import { getCurrentPrice } from "../../assets/ts/helpers";
import { Navigate } from "react-router-dom";
import NFT from "../../assets/images/nftRewards/0.jpeg";
import { ReduxState } from "../../store/store";
import { Staking } from "../../assets/ts/StakingClient";
import { HOCClaimRewards } from "./HOCClaimRewards";
import "./claimRewards.scss";
import { getTokenOfOwnerByIndex } from "../../assets/ts/evmUtils";
import { useDispatch } from "react-redux";
import {
    setAlgoRewards,
    setEVMStakesArray,
    setFetchedAlgoStakes,
    setXPNetPrice,
} from "../../store/reducer/homePageSlice";
import { ThreeCircles } from "react-loader-spinner";
import { getAlgoReward, getAllAlgoStakes } from "../../assets/ts/algoUtils";
import { NFTRewards } from "../../Components/Rewards/NFTRewards";
import RewardsDetails from "../../Components/Rewards/RewardsDetails";
import AlgoRewardsDetails from "../../Components/Rewards/AlgoRewardsDetails";
import { AlgoNFTRewards } from "../../Components/Rewards/AlgoNFTRewards";

interface Props {
    chain: string;
}

const ClaimRewards = ({ chain }: Props) => {
    const dispatch = useDispatch();

    const [indexOfStake, setIndexOfStake] = useState(0);
    const [indexOfAlgoStake, setIndexOfAlgoStake] = useState(0);

    const {
        evmStakes,
        account,
        evmAccount,
        evmStakesArray,
        fetchedAlgoStakes,
        algoRewards,
        activeSessionStakes,
        blockchain,
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
        const algoRewardsAndStakes = async () => {
            const rewards = await getAlgoReward(account);
            dispatch(setAlgoRewards(rewards));
            const stakes = await getAllAlgoStakes(account);
            if (fetchedAlgoStakes?.length !== stakes?.length)
                dispatch(setFetchedAlgoStakes(stakes));
        };
        if (account) {
            algoRewardsAndStakes();
        }
        const getEVMStakes = async (evmStakes: any) => {
            const tokens = await getTokenOfOwnerByIndex(evmStakes, evmAccount);
            dispatch(setEVMStakesArray(tokens));
        };
        if (chain === "BSC" && evmStakes) {
            getEVMStakes(evmStakes);
        }
        const getCurrency = async () => {
            let currency = await getCurrentPrice();
            dispatch(setXPNetPrice(currency));
        };
        getCurrency().catch(console.error);
    }, [chain, evmAccount, evmStakes]);

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
