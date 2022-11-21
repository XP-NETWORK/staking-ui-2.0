import React, { FC } from "react";
import {
    appAdress3Months,
    appAdress6Months,
    appAdress9Months,
    appAdress12Months,
} from "./../../assets/ts/Consts";

interface Props {
    handleStake: Function;
    optInApps: any;
    durationSelected: number;
    isAgree: boolean;
}

export const STAKEButton: FC<Props> = ({
    handleStake,
    optInApps,
    durationSelected,
    isAgree,
}) => {
    const isOptIn = (durationSelected: number): Boolean => {
        if (optInApps) {
            switch (durationSelected) {
                case 3:
                    return optInApps.some(
                        (e: any) => e.id === appAdress3Months
                    );
                case 6:
                    return optInApps.some(
                        (e: any) => e.id === appAdress6Months
                    );
                case 9:
                    return optInApps.some(
                        (e: any) => e.id === appAdress9Months
                    );
                case 12:
                    return optInApps.some(
                        (e: any) => e.id === appAdress12Months
                    );
                default:
                    return false;
            }
        }
        return false;
    };

    const isDisabled = (isAgree: boolean, durationSelected: number) => {
        return isAgree && isOptIn(durationSelected);
    };

    return (
        <button
            className="blueBtn"
            disabled={!isDisabled(isAgree, durationSelected)}
            onClick={() => handleStake()}
        >
            Stake
        </button>
    );
};
