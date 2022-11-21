import React, { FC, useEffect } from "react";
import classNames from "classnames";
import {
    appAdress3Months,
    appAdress6Months,
    appAdress9Months,
    appAdress12Months,
} from "./../../assets/ts/Consts";

interface Props {
    optIntAsset: Function;
    optInApps: any;
    durationSelected: number;
}

export const OPTINButton: FC<Props> = ({
    optIntAsset,
    optInApps,
    durationSelected,
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

    return (
        <button
            style={{
                // pointerEvents: isOptIn(durationSelected) ? "none" : "auto",
                opacity: isOptIn(durationSelected) ? "0.3" : "",
            }}
            className={classNames("blueBtn", "blackBtn")}
            onClick={() => optIntAsset()}
        >
            OPT-IN
        </button>
    );
};
