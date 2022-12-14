import classNames from "classnames";
import React, { useEffect, useState } from "react";
import lock from "../../assets/images/lock.svg";
import { getRemainedDays, unstakeTokens } from "../../assets/ts/algoUtils";
import { IFetchedStake } from "../../assets/ts/Consts";

interface Props {
    signer: {};
    account: string;
    stakes: IFetchedStake[];
    index: number;
}

export default function UNSTAKEButton({
    signer,
    account,
    stakes,
    index,
}: Props) {
    const [legalToUnstake, setLegalToUnstake] = useState(false);

    const handleUnstake = async () => {
        const unstaked = await unstakeTokens(signer, account, stakes, index);
        console.log({ unstaked });
    };

    useEffect(() => {
        const days = getRemainedDays(
            stakes[index].lockTime,
            stakes[index].stakingTime
        );
        setLegalToUnstake(!days);
    }, [index]);

    return (
        <button
            className={
                legalToUnstake ? "blueBtn" : classNames("blueBtn", "blackBtn")
            }
            onClick={handleUnstake}
            style={{ pointerEvents: "none" }}
        >
            {!legalToUnstake && <img src={lock} alt="lock_img" />}
            Unstake
        </button>
    );
}
