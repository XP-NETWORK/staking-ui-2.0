import React, { FC } from "react";
import { useSelector } from "react-redux";
import { AlgoNFTRewards } from "../../Components/Rewards/AlgoNFTRewards";
import AlgoRewardsDetails from "../../Components/Rewards/AlgoRewardsDetails";
import { ReduxState } from "../../store/store";

interface Props {
    indexOfAlgoStake: number;
    setIndexOfAlgoStake: Function;
    carouselMoveNext: undefined | boolean;
    setCarouselMoveNext: Function;
}

export const ClaimAlgorand: FC<Props> = ({
    indexOfAlgoStake,
    setIndexOfAlgoStake,
    carouselMoveNext,
    setCarouselMoveNext,
}) => {
    const { fetchedAlgoStakes, algoRewards, activeSessionStakes } = useSelector(
        (state: ReduxState) => state.homePage
    );

    return (
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
                carouselMoveNext={carouselMoveNext}
                setCarouselMoveNext={setCarouselMoveNext}
            />
        </>
    );
};
