import React, { FC } from "react";
import classNames from "classnames";
import { ReduxState } from "../../store/store";
import { useSelector } from "react-redux";
import icon from "../../assets/images/checked.svg";

interface Props {
    optIntAsset: Function;
    optInApps: any;
    durationSelected: number;
    isAgree: boolean;
}

export const OPTINButton: FC<Props> = ({ optIntAsset, optInApps, isAgree }) => {
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

    return (
        <button
            style={{
                pointerEvents: isOptIn() ? "none" : "auto",
                // opacity: isOptIn() || !optInApps ? "0.3" : "",
                backgroundColor: isOptIn() ? "rgba(2, 198, 139, 0.04)" : "",
            }}
            className={classNames(
                "blueBtn optInBtn",
                `blackBtn${isOptIn() ? "--disabled" : ""}`,
                `${!isOptIn() && isAgree ? "glowing" : ""}`
            )}
            // className={`blackBtn${isOptIn() ? "--disabled" : ""}`}
            onClick={() => optIntAsset()}
        >
            {isOptIn() && (
                <span>
                    <img src={icon} alt="" />
                </span>
            )}
            {!isOptIn() ? "Opt-In" : "Success Opt-In"}
        </button>
    );
};
