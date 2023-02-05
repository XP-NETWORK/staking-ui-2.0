import React, { FC, useEffect } from "react";
import classNames from "classnames";
import { ReduxState } from "../../store/store";
import { useSelector } from "react-redux";
import icon from "../../assets/images/checked.svg";

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
    const { algoDetails, optInedApps } = useSelector(
        (state: ReduxState) => state.homePage
    );
    const isOptIn = (): Boolean => {
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

    return (
        <button
            style={{
                pointerEvents: isOptIn() ? "none" : "auto",
                // opacity: isOptIn() || !optInApps ? "0.3" : "",
                backgroundColor: isOptIn() ? "rgba(2, 198, 139, 0.04)" : "",
            }}
            className={classNames(
                "blueBtn",
                `blackBtn${isOptIn() ? "--disabled" : ""}`
            )}
            // className={`blackBtn${isOptIn() ? "--disabled" : ""}`}
            onClick={() => optIntAsset()}
        >
            {isOptIn() && (
                <span>
                    <img src={icon} alt="" />
                </span>
            )}
            {!isOptIn() ? "Opt-In" : "Already Opted-In"}
        </button>
    );
};
