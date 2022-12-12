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
    }, []);

    return (
        <>
            <div className="progress">
                <div className="progressContainerHome">
                    <div
                        className="progressLoader"
                        style={{ width: `${percent}%` }}
                    ></div>
                </div>
                <div
                    className="progressDetails"
                    style={{
                        visibility: `${percent >= 100 ? "visible" : "hidden"}`,
                    }}
                >
                    <label>
                        <img src={emojy} />
                        Staking limit is reached!
                    </label>
                    {percent}%
                </div>
            </div>
        </>
    );
};
