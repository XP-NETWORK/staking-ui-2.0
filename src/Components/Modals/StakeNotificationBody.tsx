import React, { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import close from "../../assets/images/close-icon.svg";
import { getAllNftsToNotification } from "../../assets/ts/algoUtils";
import { IActiveSessionSTake, INFT } from "../../assets/ts/Consts";
import { ReduxState } from "../../store/store";
import "./modals.scss";
import { useDispatch } from "react-redux";
import {
    setRefreshTheAlgoRewards,
    setStakingNotification,
} from "../../store/reducer/homePageSlice";
import { useOnClickOutside } from "../../assets/ts/helpers";

import { FailTransactionBody } from "./FailTransactionBody";
import { SuccessTransactionBody } from "./SuccessTransactionBody";

interface Props {
    notification: string | undefined;
}

export const StakeNotificationBody: FC<Props> = ({ notification }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const ref = React.useRef<HTMLInputElement>(null);
    useOnClickOutside(ref, () => dispatch(setStakingNotification(undefined)));
    const { activeSessionStakes, account } = useSelector(
        (state: ReduxState) => state.homePage
    );

    const handleClick = () => {
        navigate(`/rewards${location.search}`);
        dispatch(setStakingNotification(undefined));
        setTimeout(() => {
            dispatch(setRefreshTheAlgoRewards());
        }, 1000);
    };
    const [activeSTakeNFT, setActiveSTakeNFT] = useState<any>();

    const stake: IActiveSessionSTake =
        activeSessionStakes[activeSessionStakes?.length - 1];

    const show = (str: string | undefined) => {
        switch (str) {
            case "fail":
                return <FailTransactionBody />;
            default:
                return (
                    <SuccessTransactionBody
                        stake={stake}
                        handleClick={handleClick}
                        activeSTakeNFT={activeSTakeNFT}
                    />
                );
        }
    };

    useEffect(() => {
        if (account && notification !== "fail" && !activeSTakeNFT) {
            // debugger;
            const intervalId = window.setInterval(async () => {
                const fetchedNFTs = await getAllNftsToNotification(account);
                const exist = fetchedNFTs?.find(
                    (nft: INFT) => nft.txId === stake.txID
                );
                if (exist) {
                    clearInterval(intervalId);
                    setActiveSTakeNFT(exist);
                    dispatch(setRefreshTheAlgoRewards());
                }
            }, 30000);

            return () => clearInterval(intervalId);
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
                paddingTop: "100px",
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
