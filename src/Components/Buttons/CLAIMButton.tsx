import classNames from "classnames";
import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { claimRewards } from "../../assets/ts/algoUtils";
import { setRefreshTheAlgoRewards } from "../../store/reducer/homePageSlice";
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
        (e: IAlgoRewards) => e.appid === stakes[index].appId
    );

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleClaimXPNET = async () => {
        if (cell) {
            navigate("/rewards");
            // dispatch(setTableAlgoSTakeIndex(index));
        } else {
            const response = await claimRewards(signer, account, stakes, index);
            if (response) dispatch(setRefreshTheAlgoRewards());
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
        <div className="claim-btn-cell" onClick={handleClaimXPNET}>
            Claim
        </div>
    );
};
