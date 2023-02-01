import React, { FC, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import close from "../../assets/images/close-icon.svg";
import {
    formatTheNumber,
    getAlgoReward,
    getAllAlgoStakes,
    getAllNFTsByOwner,
    getAPY,
} from "../../assets/ts/algoUtils";
import {
    IActiveSessionSTake,
    IFetchedStake,
    INFT,
} from "../../assets/ts/Consts";
import { ReduxState } from "../../store/store";
import "./modals.scss";
import fail from "./../../assets/images/404.png";
import { useDispatch } from "react-redux";
import {
    setAlgoRewards,
    setFetchedAlgoStakes,
    setNFTSByOwner,
    setStakingNotification,
} from "../../store/reducer/homePageSlice";
import {
    addCommas,
    calculateEndDate,
    calculateEstimatedRewards,
    convertSecondsToMonths,
    useOnClickOutside,
} from "../../assets/ts/helpers";
import icon from "./../../assets/images/treasure.svg";

interface Props {
    notification: string | undefined;
}

export const StakeNotificationBody: FC<Props> = ({ notification }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const ref = React.useRef<HTMLInputElement>(null);
    useOnClickOutside(ref, () => dispatch(setStakingNotification(undefined)));
    const { activeSessionStakes, fetchedAlgoStakes, nfts, account } =
        useSelector((state: ReduxState) => state.homePage);

    const handleClick = () => {
        navigate("/rewards");
        dispatch(setStakingNotification(undefined));
    };
    const [lastNFT, setLastNFT] = useState<INFT>();

    // const lastNFT = nfts[nfts.length - 1];
    const fetchedStake = fetchedAlgoStakes[fetchedAlgoStakes.length - 1];
    const stake: IActiveSessionSTake =
        activeSessionStakes[activeSessionStakes?.length - 1];

    const toShowNft = (
        nft: INFT,
        fetchedStake: IFetchedStake,
        activeSTake: IActiveSessionSTake
    ) => {
        // debugger;
        const nftTxnId = nft.txId;
        const fetchedStakeTxId = fetchedStake.txId;
        const activeStake = activeSTake.txID;
        // return (
        //     nftTxnId === fetchedStakeTxId &&
        //     fetchedStakeTxId === activeStake &&
        //     activeStake === nftTxnId
        // );
        return true;
    };

    const show = (str: string | undefined) => {
        switch (str) {
            case "fail":
                return (
                    <div className="fail-txn-body">
                        <img src={fail} alt="" />
                        <h4>Staking Incomplete</h4>
                        <div>
                            An error has occurred.
                            <br /> Please try again.
                        </div>
                        <div
                            onClick={() => navigate("/rewards")}
                            className="stake-notif-btn"
                        >
                            Back to Staking
                        </div>
                        <a
                            href="https://t.me/XP_NETWORK_Bridge_Support_Bot?start=startwithxpbot"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Contact Help Center {"->"}
                        </a>
                    </div>
                );
            default:
                return (
                    <div className="success-txn-body">
                        <div className="success-txn-header">
                            <img src={icon} alt="" />
                            <span>Your $XPNETs are locked </span>
                        </div>
                        <div className="success-txn__info">
                            <div className="success-txn-item">
                                <span className="success-item-label">
                                    You staked
                                </span>
                                <span className="success-item-value">
                                    {stake &&
                                        `${addCommas(stake.amount)} XPNET`}
                                </span>
                            </div>
                            <div className="success-txn-item">
                                <span className="success-item-label">
                                    End date
                                </span>
                                <span className="success-item-value">
                                    {calculateEndDate(
                                        convertSecondsToMonths(
                                            stake.details.duration
                                        )
                                    )}
                                </span>
                            </div>
                            <div className="success-txn-item">
                                <span className="success-item-label">
                                    You will earn
                                </span>
                                <span className="success-item-value">
                                    {stake &&
                                        `${addCommas(
                                            calculateEstimatedRewards(
                                                Number(stake.amount),
                                                stake.details.duration
                                            )
                                        )} XPNET`}
                                </span>
                            </div>
                            {fetchedAlgoStakes.length &&
                                lastNFT &&
                                toShowNft(lastNFT, fetchedStake, stake) && (
                                    <div className="success-txn-item image-item">
                                        <span className="success-item-label">
                                            Your reward
                                        </span>
                                        <span className="success-item-value">
                                            <img
                                                src={lastNFT.Uri.image}
                                                alt=""
                                            />
                                        </span>
                                    </div>
                                )}
                        </div>
                        {/* <div>
                            <img src={icon} alt="" />
                            <h4>Staking success</h4>
                        </div>
                        <div className="txn-body">
                            <div className="txn-amount">
                                <span>Staking amount</span>
                                <span>{`${formatTheNumber(
                                    stake?.amount
                                )} XPNET`}</span>
                            </div>
                            <div className="txn-id">
                        <span>Transaction Id</span>
                        <span>
                            <a
                                href={`https://algoexplorer.io/tx/${stake?.txID}`}
                                target="_blank"
                                rel="noreferrer"
                            >{`${stake?.txID.slice(
                                0,
                                4
                            )}...${stake?.txID.slice(
                                stake?.txID.length - 4
                            )}`}</a>
                        </span>
                    </div>
                        </div>
                        <div onClick={handleClick} className="stake-notif-btn">
                            Go to claiming portal
                        </div> */}
                        <div onClick={handleClick} className="stake-notif-btn">
                            Go to claiming portal
                        </div>
                    </div>
                );
        }
    };

    useEffect(() => {
        let rewardsInt: any;
        let stakesInt: any;
        const algoRewardsAndStakes = async () => {
            // debugger;
            let rewards = await getAlgoReward(account);
            rewardsInt = setInterval(
                async () => (rewards = await getAlgoReward(account)),
                200
            );

            dispatch(setAlgoRewards(rewards));
            clearInterval(rewardsInt);
            let stakes = await getAllAlgoStakes(account);
            let nfts;
            nfts = await getAllNFTsByOwner(account, stakes);
            if (nfts) setLastNFT(nfts[nfts.length - 1]);
            dispatch(setNFTSByOwner(nfts));
            if (fetchedAlgoStakes?.length !== stakes?.length)
                dispatch(setFetchedAlgoStakes(stakes));
            if (!stakes) {
                stakesInt = setInterval(
                    async () => (stakes = await getAlgoReward(account)),
                    200
                );
            } else if (stakes) {
                dispatch(setAlgoRewards(rewards));
                clearInterval(stakesInt);
            }
        };
        if (account) {
            algoRewardsAndStakes();
        }
    }, []);

    return (
        <div
            style={{
                position: "fixed",
                left: "0px",
                display: "grid",
                placeItems: "center",
                height: "110%",
                width: "100%",
                backdropFilter: "blur(15px)",
                zIndex: 99,
            }}
        >
            <div ref={ref} className="errorWraper stake-notif">
                {notification !== "success" && (
                    <span
                        onClick={() =>
                            dispatch(setStakingNotification(undefined))
                        }
                        className="errorWraper-close"
                    >
                        <img src={close} alt="" />
                    </span>
                )}
                {show(notification)}
            </div>
        </div>
    );
};
