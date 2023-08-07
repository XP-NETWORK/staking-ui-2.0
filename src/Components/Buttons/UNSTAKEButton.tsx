import classNames from "classnames";
import React, { useEffect, useState } from "react";
import lock from "../../assets/images/lock.svg";
import { getRemainedDays, unstakeTokens } from "../../assets/ts/algoUtils";
import { IFetchedStake } from "../../assets/ts/Consts";
import { useDispatch } from "react-redux";
import { setShowLoader } from "../../store/reducer/homePageSlice";

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
    const [legalToUnstake, setLegalToUnstake] = useState(true);
    const dispatch = useDispatch();

    const handleUnstake = async () => {
        dispatch(setShowLoader(true));
        const unstaked = await unstakeTokens(
            signer,
            account,
            stakes,
            index
        ).catch(() => undefined);
        if (unstaked) {
            setLegalToUnstake(false);
        }
        dispatch(setShowLoader(false));
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
            style={{ pointerEvents: legalToUnstake ? "auto" : "none" }}
        >
            {!legalToUnstake && <img src={lock} alt="lock_img" />}
            Unstake
        </button>
    );
}
