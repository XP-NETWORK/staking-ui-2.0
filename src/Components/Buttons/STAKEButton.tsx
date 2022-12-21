import React, { FC } from "react";
import { useSelector } from "react-redux";
import { ReduxState } from "../../store/store";
// import {
//     appAdress3Months,
//     appAdress6Months,
//     appAdress9Months,
//     appAdress12Months,
//     AlgoDetails,
// } from "./../../assets/ts/Consts";

interface Props {
    handleStake: Function;
    optInApps: any;
    durationSelected: number;
    isAgree: boolean;
    inputErr: boolean;
    amount: number;
}

export const STAKEButton: FC<Props> = ({
    handleStake,
    optInApps,
    durationSelected,
    isAgree,
    inputErr,
}) => {
    const algoDetails = useSelector(
        (state: ReduxState) => state.homePage.algoDetails
    );
    const isOptIn = (): Boolean => {
        return (
            optInApps && optInApps.some((e: any) => e.id === algoDetails.appId)
        );
    };

    const isDisabled = (isAgree: boolean, durationSelected: number) => {
        return isAgree && isOptIn();
    };

    return (
        <button
            className="blueBtn"
            disabled={inputErr || !isDisabled(isAgree, durationSelected)}
            onClick={() => handleStake()}
        >
            Stake
        </button>
    );
};
