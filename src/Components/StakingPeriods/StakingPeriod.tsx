import React, { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
    appAdress12Months,
    appAdress3Months,
    appAdress6Months,
    appAdress9Months,
    IFetchedStake,
} from "../../assets/ts/Consts";
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
    const dev = window.location.hostname === "localhost";
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
        if (currentPeriodStakes && currentPeriodStakes.length > 8) {
            setStakeLimit(true);
            setDuration(6);
        }
    }, [fetchedAlgoStakes]);

    return (
        <button
            value={duration}
            className="periodBtn"
            style={{
                cursor: `${duration === durationSelected ? "" : "pointer"}`,
                pointerEvents: `${
                    duration === durationSelected ? "none" : "auto"
                }`,
                background: `${
                    duration === durationSelected
                        ? "rgba(255, 255, 255, 0.1)"
                        : "rgba(255, 255, 255, 0.03)"
                }`,
            }}
            onClick={() =>
                !(stakeLimit && dev) ? setDuration(duration) : () => {}
            }
        >
            {duration === 12 ? "1 year" : `${duration} months`}
            <span>{`APY ${APY(duration)}%`}</span>
            {stakeLimit && dev && (
                <div className="periodBtn-limited">3 months limit reached!</div>
            )}
        </button>
    );
};
