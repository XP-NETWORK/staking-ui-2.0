import React, { useEffect, ReactNode, useRef, useState } from "react";
import "./App.css";
import { Home } from "./Pages/Home/Home";
import "normalize.css";
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import { Main } from "./Pages/Main/Main";
import { Connect } from "./Components/Connect/Connect";
import { Stake } from "./Pages/Stake/Stake";
import ClaimRewards from "./Pages/ClaimRewards/ClaimRewards";
import { Gallery } from "./Pages/Gallery/Gallery";
import { Error } from "./Components/Error/Error";
import { StakingLimitPopup } from "./Components/StakingLimitPopup/StakingLimitPopup";
import WrongRoute from "./Pages/WrongRoute/WrongRoute";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { ReduxState } from "./store/store";
import ConnectModalBody from "./Components/Modals/ConnectModalBody";
import ErrorModalBody from "./Components/Modals/ErrorModalBody";
import { getXpNetBalance } from "./assets/ts/algoUtils";
import { setBalance } from "./store/reducer/homePageSlice";
import { useDisconnect } from "wagmi";
import LimitModalBody from "./Components/Modals/LimitModalBody";

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

function App() {
    const dispatch = useDispatch();

    const {
        showConnectModal,
        showErrorModal,
        account,
        stakingClient,
        showLimitModal,
    } = useSelector((state: ReduxState) => state.homePage);

    useEffect(() => {
        const getBalance = async () => {
            const balance = await getXpNetBalance(stakingClient);
            if (balance) dispatch(setBalance(balance));
            else {
                dispatch(setBalance(balance));
                console.log("Oh nooooooo");
            }
        };
        if (account) getBalance().catch(console.error);
    }, [account]);

    return (
        <>
            <BrowserRouter>
                <div id="modal-root"></div>
                {showConnectModal && (
                    <ConnectModal>
                        <ConnectModalBody />
                    </ConnectModal>
                )}
                <div id="no-xp-modal"></div>
                {showErrorModal && (
                    <NoXpNetModal>
                        <ErrorModalBody />
                    </NoXpNetModal>
                )}
                <div id="limit-modal"></div>
                {showLimitModal && (
                    <BSCStakeLimitModal>
                        <LimitModalBody />
                    </BSCStakeLimitModal>
                )}
                <Routes>
                    <Route path="/" element={<Main />}>
                        <Route index element={<Home />} />
                        <Route path="/connect/:to" element={<Connect />} />
                        <Route path="/connect" element={<Connect />} />
                        <Route path="/stake" element={<Stake />} />
                        <Route path="/rewards" element={<ClaimRewards />} />
                        <Route path="/gallery" element={<Gallery />} />
                        <Route path="/error" element={<Error />} />
                        <Route path="/limit" element={<StakingLimitPopup />} />
                        <Route path="*" element={<WrongRoute />} />
                        {/*  
                        <Route path="/associationDonation" element={<DonationMain />}>
                                <Route index element={<Donation />} />
                                <Route path="/associationDonation/Receipt" element={<DonationDetails />} />
                        </Route>
                         <Route path="/payment-completed" element={<PaymentCompleted/>}/>
                         */}
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
