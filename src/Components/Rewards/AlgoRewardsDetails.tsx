import classNames from "classnames";
import {
    assetIdx,
    IActiveSessionSTake,
    IAlgoRewards,
    IFetchedStake,
    subAppId,
} from "../../assets/ts/Consts";
import { useSelector } from "react-redux";
import { ReduxState } from "../../store/store";
import {
    createClient,
    formatTheNumber,
    getAlgoStakeEndDate,
    getAlgoStakeProgress,
    getAPY,
    getMonths,
    getRemainedDays,
} from "../../assets/ts/algoUtils";
import { ProgressStaking } from "../ProgressStaking/ProgressStaking";
import { useEffect, useState } from "react";
import { CLAIMButton } from "../Buttons/CLAIMButton";
import UNSTAKEButton from "../Buttons/UNSTAKEButton";

interface Props {
    rewards: IAlgoRewards[];
    sessionStakes: IActiveSessionSTake[];
    stakes: IFetchedStake[];
    stakeIndex: number;
}
export default function AlgoRewardsDetails({
    rewards,
    stakes,
    stakeIndex,
}: Props) {
    // console.log({ rewards });

    const [selectedStake, setSelectedStake] = useState<IFetchedStake>(
        stakes[0]
    );
    const selectedStakeRewards: IAlgoRewards | undefined = rewards.find(
        (rewards: IAlgoRewards) => rewards.appid === selectedStake?.appId
    );

    const { XPNetPrice, signer, account, selectedNFTtxId } = useSelector(
        (state: ReduxState) => state.homePage
    );

    useEffect(() => {
        const stake = stakes.find((stake: IFetchedStake, index: number) => {
            return stake.txId === selectedNFTtxId;
        });
        if (stake) setSelectedStake(stake);
    }, [selectedNFTtxId, stakes]);

    return (
        <div className={classNames("containerLeft", "container")}>
            <h1>Claim Rewards</h1>
            <label className="line" />
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
                                    (selectedStake?.tokensStaked / 1e6) *
                                    XPNetPrice
                                ).toFixed(2)}
                            </span>
                            <label className="value">
                                {`${formatTheNumber(
                                    selectedStake?.tokensStaked / 1e6
                                )} XPNET`}
                            </label>
                        </div>
                    </div>
                    <div
                        id="row2"
                        className={classNames("row", "paddingBottom", "mT17")}
                    >
                        <label className="prop">APY</label>
                        <span className="value">
                            {`${getAPY(selectedStakeRewards)} %`}
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
                                href={`https://algoexplorer.io/application/${stakes[stakeIndex]?.appId}`}
                            >
                                App Claimable Rewards
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
                                    (selectedStakeRewards?.earned || 0) *
                                    XPNetPrice
                                ).toFixed(3)}
                            </span>
                            <label className="value">
                                {`${selectedStakeRewards?.earned.toFixed(
                                    3
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
                                selectedStake?.lockTime.toString(),
                                selectedStake?.stakingTime.toString()
                            )}
                        </label>
                    </div>
                </div>
                <div className="stakingDurDiv">
                    <div className="row">
                        Staking duration
                        <span>{`${getRemainedDays(
                            selectedStake.lockTime,
                            selectedStake.stakingTime
                        )} days left`}</span>
                    </div>
                    <ProgressStaking
                        progress={getAlgoStakeProgress(
                            selectedStake?.lockTime,
                            selectedStake?.stakingTime
                        )}
                    />
                </div>
                <div className="column">
                    <CLAIMButton
                        signer={signer}
                        account={account}
                        stakes={stakes}
                        index={stakeIndex}
                        cell={false}
                        earned={rewards}
                    />
                    <UNSTAKEButton
                        signer={signer}
                        account={account}
                        stakes={stakes}
                        index={stakeIndex}
                    />
                </div>
            </div>
        </div>
    );
}
