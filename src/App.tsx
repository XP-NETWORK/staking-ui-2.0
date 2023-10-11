import React, { useEffect, ReactNode, useRef } from "react";
import "./App.css";
import { Home } from "./Pages/Home/Home";
import "normalize.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Main } from "./Pages/Main/Main";
import { Stake } from "./Pages/Stake/Stake";
import ClaimRewards from "./Pages/ClaimRewards/ClaimRewards";
import { Gallery } from "./Pages/Gallery/Gallery";
import WrongRoute from "./Pages/WrongRoute/WrongRoute";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { ReduxState } from "./store/store";
import ConnectModalBody from "./Components/Modals/ConnectModalBody";
import ErrorModalBody from "./Components/Modals/ErrorModalBody";
import {
    setIfMobileDevice,
    setLastCommit,
} from "./store/reducer/homePageSlice";
import LimitModalBody from "./Components/Modals/LimitModalBody";
import { fetchXPUpdate } from "./assets/ts/helpers";
import FetchingComponent from "./Components/DataFetching/FetchingComponent";
import { StakeNotificationBody } from "./Components/Modals/StakeNotificationBody";
//import { useAccount } from "wagmi";
import { AppLimitModalBody } from "./Components/Modals/AppLimitModalBody";
import EVMErrorModalBody from "./Components/Modals/EVMErrorModalBody";
// import "bootstrap/dist/css/bootstrap.min.css";
import { AlgoSelectWallet } from "./Components/Modals/AlgoSelectWallet";
import { StakeEVM } from "./Pages/Stake/StakeEVM";
import { WavesLoader } from "./Components/Loaders/WavesLoader";

import { WagmiConfig } from "wagmi";

import { wagmiConfig } from "./Components/Wallets/walletConnectors";
import { CancelledTrxNotif } from "./Components/Error/CancelledTrxNotif";
import { SuccessTrxNotif } from "./Components/Modals/SuccessTrxNotif";

type ModalProps = {
    children: ReactNode;
};

function BSCStakeLimitModal({ children }: ModalProps) {
    const modalRoot = document.querySelector("#limit-modal") as HTMLElement;

    const elRef = useRef<HTMLDivElement | null>(null);
    if (!elRef.current) elRef.current = document.createElement("div");

    useEffect(() => {
        const el = elRef.current!; // non-null assertion because it will never be null
        modalRoot?.appendChild(el);
        // return () => {
        //     modalRoot.removeChild(el);
        // };
    }, []);
    return createPortal(children, elRef.current);
}

function StakeNotification({ children }: ModalProps) {
    const modalRoot = document.querySelector(
        "#stake-notification-modal"
    ) as HTMLElement;

    const elRef = useRef<HTMLDivElement | null>(null);
    if (!elRef.current) elRef.current = document.createElement("div");

    useEffect(() => {
        const el = elRef.current!; // non-null assertion because it will never be null
        modalRoot?.appendChild(el);
        // return () => {
        //     modalRoot.removeChild(el);
        // };
    }, []);
    return createPortal(children, elRef.current);
}

function NoXpNetModal({ children }: ModalProps) {
    const modalRoot = document.querySelector("#no-xp-modal") as HTMLElement;

    const elRef = useRef<HTMLDivElement | null>(null);
    if (!elRef.current) elRef.current = document.createElement("div");

    useEffect(() => {
        const el = elRef.current!; // non-null assertion because it will never be null
        modalRoot?.appendChild(el);
        // return () => {
        //     modalRoot.removeChild(el);
        // };
    }, []);
    return createPortal(children, elRef.current);
}

function ConnectModal({ children }: ModalProps) {
    const x = document.createElement("div");
    const modalRoot = document.getElementById("modal-root") as HTMLElement;
    useEffect(() => {
        //const el = elRef.current!; // non-null assertion because it will never be null
        modalRoot?.appendChild(x);
        // return () => {
        //     dispatch(setConnectModalShow(false));
        //     modalRoot?.removeChild(x);
        // };
    }, []);
    return createPortal(children, x);
}

function AppLimitModal({ children }: ModalProps) {
    const x = document.createElement("div");
    const modalRoot = document.getElementById("app-limit-modal") as HTMLElement;
    useEffect(() => {
        //const el = elRef.current!; // non-null assertion because it will never be null
        modalRoot?.appendChild(x);
        // return () => {
        //     dispatch(setConnectModalShow(false));
        //     modalRoot?.removeChild(x);
        // };
    }, []);
    return createPortal(children, x);
}

function App() {
    const dispatch = useDispatch();
    //const { address } = useAccount();

    const {
        showConnectModal,
        showErrorModal,
        showLimitModal,
        stakingNotification,
        showAppLimitModal,
        algoSelectWallet,
        showLoader,
        cancelledTrx,
        successTrx,
    } = useSelector((state: ReduxState) => state.homePage);

    useEffect(() => {
        const wc = window.localStorage.getItem("walletconnect");
        if (wc) window.localStorage.removeItem("walletconnect");
        if (
            /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone/i.test(
                navigator.userAgent
            )
        ) {
            dispatch(setIfMobileDevice());
        }
        const getGitUpdate = async () => {
            const commit = await fetchXPUpdate();
            dispatch(setLastCommit(commit));
        };
        getGitUpdate();
        return () => {
            //if (address) window.localStorage.clear();
        };
    }, []);

    return (
        //@ts-ignore
        <WagmiConfig config={wagmiConfig}>
            <FetchingComponent />
            <BrowserRouter>
                <div id="modal-root"></div>

                {showLoader && (
                    <BSCStakeLimitModal>
                        <WavesLoader wrap={true} />
                    </BSCStakeLimitModal>
                )}

                {Array.isArray(algoSelectWallet) && (
                    <BSCStakeLimitModal>
                        <AlgoSelectWallet algoSelectWallet={algoSelectWallet} />
                    </BSCStakeLimitModal>
                )}
                {showConnectModal && (
                    <ConnectModal>
                        <ConnectModalBody />
                    </ConnectModal>
                )}
                <div id="no-xp-modal"></div>
                {cancelledTrx && <CancelledTrxNotif />}
                {successTrx && <SuccessTrxNotif />}
                {showErrorModal && (
                    <NoXpNetModal>
                        {showErrorModal !== "evmError" ? (
                            <ErrorModalBody />
                        ) : (
                            <EVMErrorModalBody error={showErrorModal} />
                        )}
                    </NoXpNetModal>
                )}
                <div id="limit-modal"></div>
                {showLimitModal && (
                    <BSCStakeLimitModal>
                        <LimitModalBody />
                    </BSCStakeLimitModal>
                )}
                <div id="stake-notification-modal"></div>
                {stakingNotification && (
                    <StakeNotification>
                        <StakeNotificationBody
                            notification={stakingNotification}
                        />
                    </StakeNotification>
                )}
                <div id="app-limit-modal"></div>
                {showAppLimitModal && (
                    <AppLimitModal>
                        <AppLimitModalBody />
                    </AppLimitModal>
                )}
                <Routes>
                    <Route path="/" element={<Main />}>
                        <Route index element={<Home />} />
                        {<Route path="/evm-stake" element={<StakeEVM />} />}
                        <Route path="/stake" element={<Stake />} />
                        <Route path="/rewards" element={<ClaimRewards />} />
                        <Route path="/gallery" element={<Gallery />} />
                        <Route path="*" element={<WrongRoute />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </WagmiConfig>
    );
}

export default App;
