import React, { FC, useEffect, useRef, useState } from "react";
import { Outlet } from "react-router";
import { Footer } from "../../Components/Footer/Footer";
import { Navbar } from "../../Components/Navbar/Navbar";
import { ErrorBoundary } from "react-error-boundary";
import "./main.scss";
import ErrorFallback from "../ErrorFallback/ErrorFallback";
import { Modal } from "react-bootstrap";
import classNames from "classnames";
import bg from "../../assets/images/desk/bg.png";
import bgMob from "../../assets/images/mob/mobg.png";
import {
    getAlgoReward,
    getAllAlgoStakes,
    getAllNFTsByOwner,
} from "../../assets/ts/algoUtils";
import { useDispatch, useSelector } from "react-redux";
import { ReduxState } from "../../store/store";
import {
    setAlgoRewards,
    setFetchedAlgoStakes,
    setNFTSByOwner,
} from "../../store/reducer/homePageSlice";

interface Props {}

export const Main: FC<Props> = ({}) => {
    const dispatch = useDispatch();
    const [interval, setInterval] = useState<any>();
    const { account, refreshTheAlgoRewards } = useSelector(
        (state: ReduxState) => state.homePage
    );

    useEffect(() => {
        // debugger;
        const fetchAlgoReward = async () => {
            return await getAlgoReward(account);
        };
        const fetchAlgoStakes = async () => {
            return await getAllAlgoStakes(account);
        };
        const fetchNFTS = async (stakes: any[]) => {
            // debugger;
            const nfts = await getAllNFTsByOwner(account, stakes);
            if (nfts?.length === stakes.length) {
                dispatch(setNFTSByOwner(nfts));
                clearInterval(interval);
            } else {
                const i = window.setInterval(() => {
                    fetchNFTS(stakes);
                }, 500);
                setInterval(i);
            }
        };
        if (account) {
            fetchAlgoReward().then((rewards: any) => {
                dispatch(setAlgoRewards(rewards));
            });
            fetchAlgoStakes().then((stakes: any) => {
                dispatch(setFetchedAlgoStakes(stakes));
                fetchNFTS(stakes);
            });
        }
        return () => {};
    }, [account, refreshTheAlgoRewards]);

    return (
        <div className="appWrapper">
            {/* <img src={bg} className={classNames("bg", "deskOnly")} alt="bg" />
            <img src={bgMob} className={classNames("bg", "mobOnly")} alt="bg" /> */}
            <Navbar />
            <ErrorBoundary
                FallbackComponent={ErrorFallback}
                onReset={() => {
                    // reset the state of your app so the error doesn't happen again
                }}
            >
                <Outlet />
            </ErrorBoundary>
            <Footer />
        </div>
    );
};
