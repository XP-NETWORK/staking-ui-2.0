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

    isAgree,
    inputErr,
}) => {
    const { algoDetails, optInedApps } = useSelector(
        (state: ReduxState) => state.homePage
    );
    const isOptIn = (): boolean => {
        // debugger;
        if (
            optInedApps &&
            optInedApps.some((e: any) => e === algoDetails.appId)
        ) {
            return true;
        } else
            return (
                optInApps && optInApps.some((e: any) => e === algoDetails.appId)
            );
    };

    const isDisabled = (isAgree: boolean) => {
        return isAgree && isOptIn();
    };

    return (
        <button
            className="blueBtn"
            disabled={inputErr || !isDisabled(isAgree)}
            onClick={() => handleStake()}
        >
            Stake
        </button>
    );
};
