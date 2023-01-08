import classNames from "classnames";
import React from "react";
import { useDispatch } from "react-redux";
import { claimRewards } from "../../assets/ts/algoUtils";
import { setRefreshTheAlgoRewards } from "../../store/reducer/homePageSlice";
import { IFetchedStake } from "./../../assets/ts/Consts";

interface Props {
    signer: {};
    account: string;
    stakes: IFetchedStake[];
    index: number;
    cell: boolean;
}

export default function CLAIMButton({
    signer,
    account,
    stakes,
    index,
    cell,
}: Props) {
    const dispatch = useDispatch();
    const handleClaimXPNET = async () => {
        const response = await claimRewards(signer, account, stakes, index);
        console.log({ response });
        dispatch(setRefreshTheAlgoRewards());
        // TODO pop-up to show the rewards claimed
    };
    const responsive = window.innerWidth < 600;

    return responsive ? (
        <button
            className={classNames("blueBtn", "mt-0")}
            onClick={handleClaimXPNET}
        >
            Claim XPNET
        </button>
    ) : (
        <div className="claim-btn-cell" onClick={handleClaimXPNET}>
            Claim
        </div>
    );
}
