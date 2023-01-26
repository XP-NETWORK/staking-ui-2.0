import React, { FC } from "react";
import { useSelector } from "react-redux";
import { NFTRewards } from "../../Components/Rewards/NFTRewards";
import RewardsDetails from "../../Components/Rewards/RewardsDetails";
import { ReduxState } from "../../store/store";

interface Props {
    setIndexOfStake: Function;
    indexOfStake: number;
}

export const ClaimEVM: FC<Props> = ({ indexOfStake, setIndexOfStake }) => {
    const { evmStakesArray, fetchedAlgoStakes } = useSelector(
        (state: ReduxState) => state.homePage
    );

    return (
        <>
            <RewardsDetails stake={evmStakesArray[indexOfStake]} />
            <NFTRewards
                stakes={evmStakesArray}
                setIndex={setIndexOfStake}
                algoStakes={fetchedAlgoStakes}
                selectedStakeIndex={indexOfStake}
            />
        </>
    );
};
