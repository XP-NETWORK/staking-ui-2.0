import classNames from "classnames";
import {
    assetIdx,
    IActiveSessionSTake,
    IAlgoRewards,
    IFetchedStake,
    subAppId,
} from "../../assets/ts/Consts";
import lock from "../../assets/images/lock.svg";
import { useSelector } from "react-redux";
import { ReduxState } from "../../store/store";
import {
    createClient,
    getAlgoStakeEndDate,
    getAlgoStakeProgress,
    getAPY,
    getMonths,
    getRemainedDays,
} from "../../assets/ts/algoUtils";
import { ProgressStaking } from "../ProgressStaking/ProgressStaking";

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
    const selectedStakeRewards = rewards.find(
        (e: any) => e?.appid === stakes[stakeIndex]?.appId
    );

    const { XPNetPrice, signer, account } = useSelector(
        (state: ReduxState) => state.homePage
    );

    const handleClaimXPNET = async () => {
        const client = await createClient(
            signer,
            account,
            getMonths(stakes[stakeIndex]?.lockTime)
        );
        let rewards;

        try {
            let sp = await client.getSuggestedParams();
            sp.flatFee = true;
            sp.fee = 7_000;
            let token = BigInt(assetIdx);
            let lockTime = BigInt(stakes[stakeIndex]?.lockTime);
            let app = subAppId;
            rewards = await client.getReward(
                {
                    token,
                    lockTime,
                    app,
                },
                { suggestedParams: sp }
            );
            console.log({ rewards });
        } catch (e) {
            console.log(e);
        }
    };

    // const handleUnstake = async () => {
    //     let rewards;
    //     const client = await createClient(
    //         signer,
    //         account,
    //         getMonths(stakes[stakeIndex]?.lockTime)
    //     );
    //     try {
    //         let sp = await client.getSuggestedParams();
    //         sp.flatFee = true;
    //         sp.fee = 7_000;

    //         rewards = await client.unstake(
    //             {
    //                 stakeId: BigInt(0),
    //                 token: BigInt(assetIdx),
    //                 app: subAppId,
    //             },
    //             { suggestedParams: sp }
    //         );
    //         console.log(rewards);
    //     } catch (e) {
    //         console.log(e);
    //     }
    // };

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
                                    stakes[stakeIndex]?.tokensStaked *
                                    XPNetPrice
                                ).toFixed(2)}
                            </span>
                            <label className="value">
                                {`${stakes[stakeIndex]?.tokensStaked} XPNET`}
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
                                stakes[stakeIndex]?.lockTime.toString(),
                                stakes[stakeIndex]?.stakingTime.toString()
                            )}
                        </label>
                    </div>
                </div>
                <div className="stakingDurDiv">
                    <div className="row">
                        Staking duration
                        <span>{`${getRemainedDays(
                            stakes[stakeIndex]?.lockTime,
                            stakes[stakeIndex]?.stakingTime
                        )} days left`}</span>
                    </div>
                    <ProgressStaking
                        progress={getAlgoStakeProgress(
                            stakes[stakeIndex]?.lockTime,
                            stakes[stakeIndex]?.stakingTime
                        )}
                    />
                </div>
                <div className="column">
                    <button
                        className={classNames("blueBtn", "mt-0")}
                        onClick={handleClaimXPNET}
                    >
                        Claim XPNET
                    </button>
                    <button
                        className={classNames("blueBtn", "blackBtn")}
                        // onClick={handleUnstake}
                        style={{ pointerEvents: "none" }}
                    >
                        <img src={lock} alt="lock_img" />
                        Unstake
                    </button>
                </div>
            </div>
        </div>
    );
}
