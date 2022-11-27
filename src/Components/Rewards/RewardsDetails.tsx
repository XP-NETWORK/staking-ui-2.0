import React from "react";
import { ProgressStaking } from "../ProgressStaking/ProgressStaking";
import classNames from "classnames";
import lock from "../../assets/images/lock.svg";
import { IEVMStake } from "../../assets/ts/Consts";
import {
    convertFromWei,
    evmAPY,
    getEVMStakeEndDate,
    getEVMStakeProgress,
} from "../../assets/ts/evmUtils";
import { useSelector } from "react-redux";
import { ReduxState } from "../../store/store";

interface Props {
    stake: IEVMStake;
}
export default function RewardsDetails({ stake }: Props) {
    const { XPNetPrice, blockchain } = useSelector(
        (state: ReduxState) => state.homePage
    );

    return (
        <div className={classNames("containerLeft", "container")}>
            <h1>Claim Rewards</h1>
            <label className="line" />
            {/* <div className="sectionWrapper"> */}
            <div className={classNames("sectionWrapper", "summaryBox")}>
                <div className="periodsRewards">
                    <div
                        id="row1"
                        className="row"
                        style={{ alignItems: "flex-end" }}
                    >
                        <label className="prop">Amount</label>
                        <div
                            className="column"
                            style={{
                                alignItems: "flex-end",
                                gap: "9px",
                            }}
                        >
                            <span
                                className="small"
                                style={{ marginBottom: "10px" }}
                            ></span>
                            <span className="small">
                                ${" "}
                                {(
                                    convertFromWei(stake?.amount) * XPNetPrice
                                ).toFixed(2)}
                            </span>
                            <label className="value">
                                {`${convertFromWei(stake?.amount)} XPNET`}
                            </label>
                        </div>
                    </div>
                    <div
                        id="row2"
                        className={classNames("row", "paddingBottom", "mT17")}
                    >
                        <label className="prop">APY</label>
                        <span className="value">{`${evmAPY(
                            stake?.lockInPeriod
                        )}%`}</span>
                    </div>
                    <div
                        id="row3"
                        className="row"
                        style={{ alignItems: "flex-end" }}
                    >
                        <label className="prop">Rewards</label>
                        <div
                            className="column"
                            style={{
                                alignItems: "flex-end",
                                gap: "9px",
                            }}
                        >
                            <span
                                className="small"
                                style={{ marginBottom: "10px" }}
                            ></span>
                            <span className="small">
                                ${" "}
                                {convertFromWei(
                                    stake?.availableRewards
                                ).toFixed(2)}
                            </span>
                            <label className="value">
                                {`${convertFromWei(
                                    stake?.availableRewards
                                )} XPNET`}
                            </label>
                        </div>
                    </div>
                    <div
                        id="row4"
                        className={classNames("row", "borderBottom", "mT17")}
                    >
                        <label className="prop">End Date</label>
                        <label className="value">
                            {getEVMStakeEndDate(
                                stake?.lockInPeriod,
                                stake?.startTime
                            )}
                        </label>
                    </div>
                </div>
                <div className="stakingDurDiv">
                    <div className="row">
                        Staking duration
                        <span>0 days left</span>
                    </div>
                    <ProgressStaking
                        progress={getEVMStakeProgress(
                            stake?.lockInPeriod,
                            stake?.startTime
                        )}
                    />
                </div>
                <div className="column">
                    <button
                        className={classNames("blueBtn", "mt-0")}
                        // onClick={handleClaimXPNET}
                    >
                        Claim XPNET
                    </button>
                    <button
                        className={classNames("blueBtn", "blackBtn")}
                        // onClick={handleUnstake}
                    >
                        <img src={lock} alt="lock_img" />
                        Unstake
                    </button>
                </div>
            </div>
        </div>
    );
}
