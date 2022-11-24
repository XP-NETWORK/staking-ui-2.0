import { FC, useEffect, useState } from "react";
import classNames from "classnames";
import { useSelector } from "react-redux";
import { APY, assetIdx, subAppId, XPNET } from "../../assets/ts/Consts";
import {
    addCommas,
    calculateEndDate,
    getCurrentPrice,
} from "../../assets/ts/helpers";
import lock from "../../assets/images/lock.svg";
import { Navigate, useNavigate } from "react-router-dom";
import { ProgressStaking } from "../../Components/ProgressStaking/ProgressStaking";
import NFT from "../../assets/images/nftRewards/0.jpeg";
import { ReduxState } from "../../store/store";
import { Error } from "../../Components/Error/Error";
import { Staking } from "../../assets/ts/StakingClient";
import { HOCClaimRewards } from "./HOCClaimRewards";
import "./claimRewards.scss";
import { getTokenOfOwnerByIndex, totalSupply } from "../../assets/ts/evmUtils";
import { useDispatch } from "react-redux";
import {
    setEVMStakesArray,
    setXPNetPrice,
} from "../../store/reducer/homePageSlice";
import { NFTRewards } from "./NFTRewards";
import { ThreeCircles } from "react-loader-spinner";
import RewardsDetails from "./RewardsDetails";
import { getAlgoRewards } from "../../assets/ts/algoUtils";
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

interface Props {
    chain: string;
}

const ClaimRewards = ({ chain }: Props) => {
    const dispatch = useDispatch();
    const [clients, setClients] = useState<Staking[]>();
    const [amountStake, setAmountStake] = useState(0);
    const [mainImgSrc, setMainImgSrc] = useState(NFT);
    const [algoStakes, setAlgoStakes] = useState("");
    const [indexOfStake, setIndexOfStake] = useState(0);

    const { evmStakes, account, evmAccount, evmStakesArray, algoDetails } =
        useSelector((state: ReduxState) => state.homePage);

    const handleClaimXPNET = async () => {
        let stakingAmount;
        if (clients !== undefined) {
            let client = clients[0];
            stakingAmount = await client.getAccountState(account);

            const { dynamic_account_valuetsba } = stakingAmount;
            try {
                let sp = await client.getSuggestedParams();
                sp.flatFee = true;
                sp.fee = 7_000;

                if (dynamic_account_valuetsba > 0) {
                    await client.getReward(
                        {
                            token: BigInt(assetIdx),
                            lockTime: BigInt(algoDetails.duration),
                            app: subAppId,
                        },
                        { suggestedParams: sp }
                    );
                }
            } catch (e) {
                console.error(JSON.parse(JSON.stringify(e)));
            }
        }
    };

    const handleUnstake = async () => {
        let rewards;
        if (clients !== undefined) {
            try {
                let client = clients[0];
                let sp = await client.getSuggestedParams();
                sp.flatFee = true;
                sp.fee = 7_000;

                if (amountStake > 0) {
                    rewards = await client.unstake(
                        {
                            stakeId: BigInt(0),
                            token: BigInt(assetIdx),
                            app: subAppId,
                        },
                        { suggestedParams: sp }
                    );

                    console.log(rewards);
                }
            } catch (e) {
                console.log(e);
            }
        }
    };

    const handlePrev = () => {
        let num = mainImgSrc[mainImgSrc.length - 1] + 1;
        setMainImgSrc(`NFT${num}`);
    };

    const showLoader = () => {
        if (algoStakes || evmStakesArray.length > 0) {
            return false;
        } else return true;
    };

    useEffect(() => {
        const algoRewards = async () => {
            const rewards = await getAlgoRewards(account);
        };
        if (account) algoRewards();
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
        // totalSupply(0, 0);
    }, [chain, evmAccount, evmStakes]);

    if (!account && !evmAccount) return <Navigate to="/" replace />;
    return !showLoader() ? (
        <div className="stakeWrapper">
            <RewardsDetails stake={evmStakesArray[indexOfStake]} />
            <NFTRewards stakes={evmStakesArray} setIndex={setIndexOfStake} />
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
