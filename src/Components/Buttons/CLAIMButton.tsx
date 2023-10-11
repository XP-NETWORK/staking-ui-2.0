import classNames from "classnames";
import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { claimRewards } from "../../assets/ts/algoUtils";
import {
    setRefreshTheAlgoRewards,
    setShowLoader,
    setCancelledTrx,
    setSuccessTrx,
} from "../../store/reducer/homePageSlice";
import { IAlgoRewards, IFetchedStake } from "./../../assets/ts/Consts";

interface Props {
    signer: {};
    account: string;
    stakes: IFetchedStake[];
    index: number;
    cell: boolean;
    earned: IAlgoRewards[] | undefined;
}

export const CLAIMButton: FC<Props> = ({
    signer,
    account,
    stakes,
    index,
    cell,
    earned,
}) => {
    const thisStakeEarned = earned?.find(
        (e: IAlgoRewards) =>
            `${e?.appid}${e?.id}` ===
            `${stakes[index]?.appId}${stakes[index]?.id}`
    );

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleClaimXPNET = async () => {
        if (cell) {
            navigate(
                `/rewards?${location.search.slice(
                    1,
                    location.search.length - 1
                )}&claimIdx=${index}`
            );
            // dispatch(setTableAlgoSTakeIndex(index));
        } else {
            dispatch(setShowLoader(true));
            const response = await claimRewards(
                signer,
                account,
                stakes,
                index
            ).catch((error: any) => {
                if (error.message?.includes("Operation cancelled")) {
                    dispatch(setCancelledTrx(true));
                }
            });
            dispatch(setShowLoader(false));
            if (response) {
                dispatch(setSuccessTrx(true));
                dispatch(setRefreshTheAlgoRewards());
            }
        }
        // TODO pop-up to show the rewards claimed
    };
    const responsive = window.innerWidth < 600;
    const rewards = window.location.pathname === "/rewards";

    return rewards && !responsive ? (
        <button
            className={classNames("blueBtn", "mt-0")}
            onClick={handleClaimXPNET}
        >
            {`Claim ${thisStakeEarned?.earned.toFixed(3)} XPNET`}
        </button>
    ) : (
        <div className="claim-btn-cell blueBtn" onClick={handleClaimXPNET}>
            Claim
        </div>
    );
};
