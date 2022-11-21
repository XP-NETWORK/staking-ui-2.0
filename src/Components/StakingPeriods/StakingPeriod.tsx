import React, { FC, useState } from "react";
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
    const APY = (duration: number) => {
        switch (duration) {
            case 3:
                return 45;
            case 6:
                return 75;
            case 9:
                return 100;
            case 12:
                return 125;
            default:
                break;
        }
    };

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
            onClick={() => setDuration(duration)}
        >
            {`${duration} months`}
            <span>{`APY ${APY(duration)}%`}</span>
        </button>
    );
};
