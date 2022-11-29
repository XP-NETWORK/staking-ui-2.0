import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { assetIdx, subAppId } from "../../assets/ts/Consts";
import { getCurrentPrice } from "../../assets/ts/helpers";
import { Navigate, useNavigate } from "react-router-dom";
import { ReduxState } from "../../store/store";
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
import {
    createClient,
    getAlgoReward,
    getAllAlgoStakes,
} from "../../assets/ts/algoUtils";
import { NFTRewards } from "../../Components/Rewards/NFTRewards";
import RewardsDetails from "../../Components/Rewards/RewardsDetails";
import AlgoRewardsDetails from "../../Components/Rewards/AlgoRewardsDetails";
import { AlgoNFTRewards } from "../../Components/Rewards/AlgoNFTRewards";

interface Props {
    chain: string;
}

const ClaimRewards = ({ chain }: Props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [indexOfStake, setIndexOfStake] = useState(0);
    const [indexOfAlgoStake, setIndexOfAlgoStake] = useState(0);
    let timeOut = useRef();
    const {
        evmStakes,
        account,
        evmAccount,
        evmStakesArray,
        fetchedAlgoStakes,
        algoRewards,
        activeSessionStakes,
        blockchain,
        signer,
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

    // const handleUnstake = async () => {
    //     debugger;
    //     let rewards;
    //     const client = await createClient(signer, account, 3);
    //     try {
    //         let sp = await client.getSuggestedParams();
    //         sp.flatFee = true;
    //         sp.fee = 7_000;

    //         rewards = await client.unstake(
    //             {
    //                 stakeId: BigInt(0),
    //                 token: BigInt(assetIdx),
    //                 app: subAppId,
    //             },
    //             { suggestedParams: sp }
    //         );
    //         console.log(rewards);
    //     } catch (e) {
    //         console.log(e);
    //     }
    // };

    useEffect(() => {
        const t = setTimeout(() => {
            switch (blockchain.chain) {
                case "BSC":
                    if (evmStakesArray.length === 0) navigate("/error");
                    break;
                case "Algorand":
                    if (fetchedAlgoStakes.length === 0) navigate("/error");
                    break;
                default:
                    break;
            }
        }, 10000);
        return () => clearTimeout(t);
    }, [blockchain, evmStakesArray, fetchedAlgoStakes, navigate]);

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
