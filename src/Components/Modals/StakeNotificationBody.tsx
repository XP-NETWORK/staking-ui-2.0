import React, { FC, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import close from "../../assets/images/close-icon.svg";
import {
    getAllNFTsByOwner,
    getAllNftsToNotification,
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
    const [interval, setInterval] = useState<any>();
    const ref = React.useRef<HTMLInputElement>(null);
    useOnClickOutside(ref, () => dispatch(setStakingNotification(undefined)));
    const { activeSessionStakes, fetchedAlgoStakes, nfts, account } =
        useSelector((state: ReduxState) => state.homePage);

    const handleClick = () => {
        navigate("/rewards");
        dispatch(setStakingNotification(undefined));
    };
    const [activeSTakeNFT, setActiveSTakeNFT] = useState<any>();
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
        // const fetchedStakeTxId = fetchedStake.txId;
        const activeStakeId = activeSTake.txID;

        return activeStakeId === nftTxnId;
        // return true;
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
                                activeSTakeNFT &&
                                toShowNft(
                                    activeSTakeNFT,
                                    fetchedStake,
                                    stake
                                ) && (
                                    <div className="success-txn-item image-item">
                                        <span className="success-item-label">
                                            Your reward
                                        </span>
                                        <span className="success-item-value">
                                            <img
                                                src={activeSTakeNFT?.Uri.image}
                                                alt=""
                                            />
                                        </span>
                                    </div>
                                )}
                        </div>
                        <div onClick={handleClick} className="stake-notif-btn">
                            Go to claiming portal
                        </div>
                    </div>
                );
        }
    };

    const getLastActiveStakeNFT = async () => {
        debugger;
        let fetchedNFTs = await getAllNftsToNotification(account);
        const exist = fetchedNFTs?.find((nft: INFT) => nft.txId === stake.txID);
        if (exist) {
            setActiveSTakeNFT(exist);
            clearInterval(interval);
        }
    };

    useEffect(() => {
        if (account && notification !== "fail") {
            debugger;
            const intervalId = window.setInterval(async () => {
                debugger;
                let fetchedNFTs = await getAllNftsToNotification(account);
                const exist = fetchedNFTs?.find(
                    (nft: INFT) => nft.txId === stake.txID
                );
                console.log({ exist });

                if (exist) {
                    clearInterval(intervalId);
                    setActiveSTakeNFT(exist);
                }
            }, 30000);

            return () => clearInterval(intervalId);
        }
    }, []);

    // useEffect(() => {
    //     const exist = nfts?.find((nft: INFT) => nft.txId === stake.txID);
    //     const intervalId = window.setInterval(async () => {
    //         if (exist) {
    //             clearInterval(intervalId);
    //             setActiveSTakeNFT(exist);
    //         }else{

    //         }
    //     }, 3000);

    // if (!exist || exist === undefined) {
    //     const i = window.setInterval(() => {
    //         getLastActiveStakeNFT();
    //     }, 2000);
    //     setInterval(i);
    // } else {
    //     setActiveSTakeNFT(exist);
    //     clearInterval(interval);
    // }
    //     return () => clearInterval(intervalId);
    // }, [fetchedAlgoStakes]);

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
