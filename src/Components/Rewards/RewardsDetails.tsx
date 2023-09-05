import React, { useEffect, useState } from "react";
import { ProgressStaking } from "../ProgressStaking/ProgressStaking";
import classNames from "classnames";
import lock from "../../assets/images/lock.svg";
import { IEVMStake } from "../../assets/ts/Consts";
import {
    claimXpNet,
    convertFromWei,
    evmAPY,
    getEVMStakeEndDate,
    getEVMStakeProgress,
    unstakeEVMStake,
} from "../../assets/ts/evmUtils";
import { useSelector, useDispatch } from "react-redux";
import { ReduxState } from "../../store/store";
import { setShowLoader } from "../../store/reducer/homePageSlice";
import { useAccount, WalletClient } from "wagmi";

import { tmode } from "../../assets/ts/Consts";

interface Props {
    stake: IEVMStake;
}
export default function RewardsDetails({ stake }: Props) {
    const [wc_sigenr, setWCSigner] = useState<WalletClient | null>(null);
    const [compteledUnstake, setCompteledUnstake] = useState(false);
    const [compteledClaim, setCompteledClaim] = useState(false);
    const { XPNetPrice, evmAccount } = useSelector(
        (state: ReduxState) => state.homePage
    );
    const dispatch = useDispatch();

    const disableClaimBtn =
        compteledClaim ||
        (Boolean(stake?.availableRewards) &&
            Number(stake.availableRewards) === 0);

    const disabledUnstakeBtn =
        !tmode ||
        compteledUnstake ||
        stake?.stakeWithdrawn ||
        !stake?.isUnlocked;

    //@ts-ignore
    const { address, connector } = useAccount();

    useEffect(() => {
        if (address && connector) {
            //@ts-ignore
            connector.getWalletClient().then((signer) => {
                setWCSigner(signer);
            });
        }
    }, [address]);

    useEffect(() => {
        if (stake) {
            setCompteledUnstake(false);
            setCompteledClaim(false);
        }
    }, [stake]);

    const handleClaim = async () => {
        dispatch(setShowLoader(true));
        const tx = await claimXpNet(
            stake?.nftTokenId,
            stake?.availableRewards,
            evmAccount,
            wc_sigenr as any
        ).catch(() => undefined);
        dispatch(setShowLoader(false));
        if (tx) {
            setCompteledClaim(true);
        }
    };

    const handleUnstake = async () => {
        dispatch(setShowLoader(true));
        const tx = await unstakeEVMStake(
            stake?.nftTokenId,
            evmAccount,
            wc_sigenr as any
        ).catch(() => undefined);
        dispatch(setShowLoader(false));
        if (tx) {
            setCompteledUnstake(true);
        }
    };

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
                        // disabled={true}
                        className={classNames(
                            "blueBtn",
                            "mt-0",
                            disableClaimBtn ? "blackBtn" : ""
                        )}
                        onClick={handleClaim}
                    >
                        {disableClaimBtn && <img src={lock} alt="lock_img" />}
                        <span> Claim XPNET</span>
                    </button>
                    <button
                        className={!disabledUnstakeBtn ? "blueBtn" : "blackBtn"}
                        onClick={handleUnstake}
                    >
                        {disabledUnstakeBtn && (
                            <img src={lock} alt="lock_img" />
                        )}
                        <span>Unstake</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
