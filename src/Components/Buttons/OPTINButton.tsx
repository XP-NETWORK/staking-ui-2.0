import React, { FC, useEffect } from "react";
import classNames from "classnames";
import { ReduxState } from "../../store/store";
import { useSelector } from "react-redux";

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
    const algoDetails = useSelector(
        (state: ReduxState) => state.homePage.algoDetails
    );
    const isOptIn = (): Boolean => {
        // debugger;
        return (
            optInApps && optInApps.some((e: any) => e.id === algoDetails.appId)
        );
    };

    return (
        <button
            style={{
                pointerEvents: isOptIn() ? "none" : "auto",
                opacity: isOptIn() || !optInApps ? "0.3" : "",
            }}
            className={classNames("blueBtn", "blackBtn")}
            onClick={() => optIntAsset()}
        >
            OPT-IN
        </button>
    );
};
