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
}

export default function CLAIMButton({ signer, account, stakes, index }: Props) {
    const dispatch = useDispatch();
    const handleClaimXPNET = async () => {
        const response = await claimRewards(signer, account, stakes, index);
        console.log({ response });
        dispatch(setRefreshTheAlgoRewards());
        // TODO pop-up to show the rewards claimed
    };

    return (
        <button
            className={classNames("blueBtn", "mt-0")}
            onClick={handleClaimXPNET}
        >
            Claim XPNET
        </button>
    );
}
