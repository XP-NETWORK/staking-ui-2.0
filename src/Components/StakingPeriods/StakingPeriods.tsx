import classNames from "classnames";
import React from "react";

import { StakingPeriod } from "./StakingPeriod";

interface Props {
    // periods: any;
    setDuration: Function;
    duration: number;
}

export default function StakingPeriods({
    // periods,
    setDuration,
    duration,
}: Props) {
    const periods = new Array(4);
    periods.fill((e: any, index: number) => {
        return (
            <StakingPeriod
                key={index}
                duration={(index + 1) * 3}
                setDuration={setDuration}
                durationSelected={duration}
            />
        );
    });

    return (
        <div className={classNames("row", "wrapPeriods")}>
            {periods.map((component: any, i: any) => {
                return (
                    <StakingPeriod
                        key={i}
                        duration={(i + 1) * 3}
                        setDuration={setDuration}
                        durationSelected={duration}
                    />
                );
            })}
        </div>
    );
}
