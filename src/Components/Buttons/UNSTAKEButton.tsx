import classNames from "classnames";
import React, { useEffect, useState } from "react";
import lock from "../../assets/images/lock.svg";
import { getRemainedDays, unstakeTokens } from "../../assets/ts/algoUtils";
import { IFetchedStake } from "../../assets/ts/Consts";
import { useDispatch, useSelector } from "react-redux";
import {
    setShowLoader,
    disableUnstake,
    enableUnstake,
} from "../../store/reducer/homePageSlice";

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
    const [removed, setRemoved] = useState(false);

    const { disabledUnstake } = useSelector((state: any) => ({
        disabledUnstake: state.homePage.disabledUnstake,
    }));

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
            dispatch(disableUnstake(stakes[index].txId));
            setRemoved(true);
        }
        dispatch(setShowLoader(false));
    };

    useEffect(() => {
        //if (tmode) {
        //return setLegalToUnstake(true);
        // }

        if (!stakes[index]) return;

        let days = getRemainedDays(
            stakes[index].lockTime,
            stakes[index].stakingTime
        );

        if (days < 0) days = 0;
        days
            ? dispatch(disableUnstake(stakes[index].txId))
            : !removed && dispatch(enableUnstake(stakes[index].txId));
    }, [index, stakes]);

    const illegalToUnstake = disabledUnstake.includes(stakes[index]?.txId);

    return (
        <button
            className={
                !illegalToUnstake
                    ? "blueBtn"
                    : classNames("blueBtn", "blackBtn")
            }
            onClick={handleUnstake}
            style={{ pointerEvents: !illegalToUnstake ? "auto" : "none" }}
        >
            {illegalToUnstake && <img src={lock} alt="lock_img" />}
            Unstake
        </button>
    );
}
