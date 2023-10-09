import React, { FC, useEffect, useState } from "react";
import "./progressbar.scss";
import emojy from "../../assets/images/desk/emojy.svg";

interface Props {
    totalStaking: number;
    stakingLimit: number;
    chain: string;
}

export const ProgressBar: FC<Props> = ({ totalStaking, stakingLimit }) => {
    const [percent, setPercent] = useState(0);

    useEffect(() => {
        setPercent((totalStaking / stakingLimit) * 100);
    }, [totalStaking]);

    return (
        <>
            <div className="progress">
                <div className="progressContainerHome">
                    <div
                        className="progressLoader"
                        style={{
                            width: `${+percent < 0.1 ? "1" : percent}%`,
                        }}
                    ></div>
                </div>
                <div className="progressDetails">
                    <label
                        style={{
                            visibility: `${
                                percent >= 100 ? "visible" : "hidden"
                            }`,
                        }}
                    >
                        <img src={emojy} />
                        Staking limit is reached!
                    </label>
                    {percent.toFixed(2)}%
                </div>
            </div>
        </>
    );
};
