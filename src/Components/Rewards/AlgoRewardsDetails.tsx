import classNames from "classnames";
import {
    IActiveSessionSTake,
    IAlgoRewards,
    IFetchedStake,
} from "../../assets/ts/Consts";
import lock from "../../assets/images/lock.svg";
import { useState } from "react";
import { useSelector } from "react-redux";
import { ReduxState } from "../../store/store";
import {
    getAlgoStakeEndDate,
    getAlgoStakeProgress,
    getAPY,
    getRemainedDays,
} from "../../assets/ts/algoUtils";
import { getEVMStakeEndDate } from "../../assets/ts/evmUtils";
import { ProgressStaking } from "../ProgressStaking/ProgressStaking";

interface Props {
    rewards: IAlgoRewards[];
    sessionStakes: IActiveSessionSTake[];
    stakes: IFetchedStake[];
}
export default function AlgoRewardsDetails({
    rewards,
    sessionStakes,
    stakes,
}: Props) {
    const [selectedStakeIndex, setSelectedStakeIndex] = useState(5);

    const selectedStakeRewards = rewards.find(
        (e: any) => e.appid === stakes[selectedStakeIndex].appId
    );
    console.log({ selectedStakeRewards });

    const { XPNetPrice } = useSelector((state: ReduxState) => state.homePage);

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
                                    stakes[selectedStakeIndex].tokensStaked *
                                    XPNetPrice
                                ).toFixed(2)}
                            </span>
                            <label className="value">
                                {`${stakes[selectedStakeIndex].tokensStaked} XPNET`}
                            </label>
                        </div>
                    </div>
                    <div
                        id="row2"
                        className={classNames("row", "paddingBottom", "mT17")}
                    >
                        <label className="prop">APY</label>
                        <span className="value">
                            {`${getAPY(selectedStakeRewards?.appid)} %`}
                        </span>
                    </div>
                    <div
                        id="row3"
                        className="row"
                        style={{ alignItems: "flex-end" }}
                    >
                        <label className="prop">
                            <a
                                target="_blank"
                                rel="noreferrer"
                                href={`https://algoexplorer.io/application/${stakes[selectedStakeIndex].appId}`}
                            >
                                App Total Rewards
                            </a>
                        </label>
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
                                    selectedStakeRewards?.earned ||
                                    0 * XPNetPrice
                                ).toFixed(8)}
                            </span>
                            <label className="value">
                                {`${selectedStakeRewards?.earned.toFixed(
                                    8
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
                            {getAlgoStakeEndDate(
                                stakes[selectedStakeIndex].lockTime.toString(),
                                stakes[
                                    selectedStakeIndex
                                ].stakingTime.toString()
                            )}
                        </label>
                    </div>
                </div>
                <div className="stakingDurDiv">
                    <div className="row">
                        Staking duration
                        <span>{`${getRemainedDays(
                            stakes[selectedStakeIndex].lockTime,
                            stakes[selectedStakeIndex].stakingTime
                        )} days left`}</span>
                    </div>
                    <ProgressStaking
                        progress={getAlgoStakeProgress(
                            stakes[selectedStakeIndex].lockTime,
                            stakes[selectedStakeIndex].stakingTime
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
