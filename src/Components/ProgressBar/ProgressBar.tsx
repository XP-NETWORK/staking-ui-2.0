import React, { FC, useEffect, useState } from "react";
import "./progressbar.scss";
import emojy from "../../assets/images/desk/emojy.svg";
import { getTotalStaked } from "../../assets/ts/algoUtils";

interface Props {
    totalStaking: number;
    stakingLimit: number;
    chain: string;
}

export const ProgressBar: FC<Props> = ({
    totalStaking,
    stakingLimit,
    chain,
}) => {
    const [percent, setPercent] = useState(0);

    useEffect(() => {
        const getStaked = async () => {
            let per = (totalStaking / stakingLimit) * 100;
            setPercent(per);
        };
        getStaked();
    }, [totalStaking]);

    return (
        <>
            <div className="progress">
                <div className="progressContainerHome">
                    <div
                        className="progressLoader"
                        style={{ width: `${percent}%` }}
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
                    {percent.toFixed(1)}%
                </div>
            </div>
        </>
    );
};
