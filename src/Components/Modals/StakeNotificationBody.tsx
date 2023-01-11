import React, { FC, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import close from "../../assets/images/close-icon.svg";
import { formatTheNumber } from "../../assets/ts/algoUtils";
import { IActiveSessionSTake } from "../../assets/ts/Consts";
import { ReduxState } from "../../store/store";
import "./modals.scss";
import fail from "./../../assets/images/404.png";
import { useDispatch } from "react-redux";
import { setStakingNotification } from "../../store/reducer/homePageSlice";
import { useOnClickOutside } from "../../assets/ts/helpers";

interface Props {
    notification: string;
}

export const StakeNotificationBody: FC<Props> = ({ notification }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const ref = React.useRef<HTMLInputElement>(null);
    useOnClickOutside(ref, () => dispatch(setStakingNotification(undefined)));
    const { activeSessionStakes } = useSelector(
        (state: ReduxState) => state.homePage
    );

    const handleClick = () => {
        navigate("/rewards");
        dispatch(setStakingNotification(undefined));
    };

    const stake: IActiveSessionSTake =
        activeSessionStakes[activeSessionStakes?.length - 1];

    const show = (str: string) => {
        switch (str) {
            case "fail":
                return (
                    <div className="fail-txn-body">
                        <img src={fail} alt="" />
                        <h4>Oooops</h4>
                        <div>There is an error occurred</div>
                        <div
                            onClick={() => navigate("/rewards")}
                            className="stake-notif-btn"
                        >
                            Back to Staging
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
                    <>
                        <h4>🎉 Staking success</h4>
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
                            Claim
                        </div>
                    </>
                );
        }
    };

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
                <span
                    onClick={() => dispatch(setStakingNotification(undefined))}
                    className="errorWraper-close"
                >
                    <img src={close} alt="" />
                </span>
                {show(notification)}
            </div>
        </div>
    );
};
