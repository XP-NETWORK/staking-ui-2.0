import React, { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
    appAdress12Months,
    appAdress3Months,
    appAdress6Months,
    appAdress9Months,
    IFetchedStake,
    STAKE_LIMIT,
} from "../../assets/ts/Consts";
import { setShowAppLimitModal } from "../../store/reducer/homePageSlice";
import { ReduxState } from "../../store/store";
// import "./progressStaking.scss";

interface Props {
    duration: number;
    durationSelected: number;
    setDuration: Function;
}

export const StakingPeriod: FC<Props> = ({
    duration,
    durationSelected,
    setDuration,
}) => {
    const dispatch = useDispatch();
    //const dev = window.location.hostname === "localhost";
    const [stakeLimit, setStakeLimit] = useState<boolean>(false);

    const { fetchedAlgoStakes } = useSelector(
        (state: ReduxState) => state.homePage
    );

    const APY = (duration: number) => {
        switch (duration) {
            case 3:
                return 25;
            case 6:
                return 50;
            case 9:
                return 75;
            case 12:
                return 100;
            default:
                break;
        }
    };

    useEffect(() => {
        const currentPeriodStakes = fetchedAlgoStakes.filter(
            (stake: IFetchedStake) => {
                let stakingTime;
                switch (duration) {
                    case 3:
                        stakingTime = appAdress3Months;
                        break;
                    case 6:
                        stakingTime = appAdress6Months;
                        break;
                    case 9:
                        stakingTime = appAdress9Months;
                        break;
                    case 12:
                        stakingTime = appAdress12Months;
                        break;
                    default:
                        break;
                }
                return stake.appId === stakingTime;
            }
        );

        if (currentPeriodStakes && currentPeriodStakes.length >= STAKE_LIMIT) {
            setStakeLimit(true);
            //setDuration(6);
        }
    }, [fetchedAlgoStakes]);

    const isSelected = duration === durationSelected;

    return (
        <button
            value={duration}
            className={`periodBtn ${isSelected ? "periodBtn-selected" : ""}`}
            style={{
                cursor: `${isSelected ? "" : "pointer"}`,
                pointerEvents: `${isSelected ? "none" : "auto"}`,
                background: `${
                    isSelected
                        ? "rgba(255, 255, 255, 0.1)"
                        : "rgba(255, 255, 255, 0.03)"
                }`,
            }}
            onClick={() =>
                !stakeLimit
                    ? setDuration(duration)
                    : dispatch(setShowAppLimitModal(true))
            }
        >
            {duration === 12 ? "1 year" : `${duration} months`}
            <span>{`APY ${APY(duration)}%`}</span>
            {stakeLimit && (
                <div className="periodBtn-limited">3 months limit reached!</div>
            )}
        </button>
    );
};
