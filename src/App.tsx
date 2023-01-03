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
import { setLastCommit } from "./store/reducer/homePageSlice";
import LimitModalBody from "./Components/Modals/LimitModalBody";
import bg from "./assets/images/desk/bg.png";
import bgMob from "./assets/images/mob/bg.png";
import classNames from "classnames";
import { fetchXPUpdate } from "./assets/ts/helpers";
import FetchingComponent from "./Components/DataFetching/FetchingComponent";

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
    const balanceInt = useRef<number | null>(null);

    // const [lastCommit, setLastCommit] = useState<string | void>("");

    const { showConnectModal, showErrorModal, showLimitModal } = useSelector(
        (state: ReduxState) => state.homePage
    );

    // const getBalance = async () => {
    //     const balance = await getXpNetBalance(stakingClient);
    //     balance ? dispatch(setBalance(balance)) : dispatch(setErrorModal(true));
    //     dispatch(setBalance(balance));
    // };

    // const startInterval = () => {
    //     if (balanceInt.current !== null) return;
    //     balanceInt.current = window.setInterval(() => {
    //         // if (balanceInt.current !== null) return;
    //         getBalance();
    //     }, 2000);
    // };

    // useEffect(() => {
    //     if (account) {
    //         startInterval();
    //     }
    // }, [stakingClient, account]);

    useEffect(() => {
        const getGitUpdate = async () => {
            const commit = await fetchXPUpdate();
            dispatch(setLastCommit(commit));
        };
        getGitUpdate();
    }, []);

    return (
        <>
            <img src={bg} className={classNames("bg", "deskOnly")} alt="bg" />
            <img src={bgMob} className={classNames("bg", "mobOnly")} alt="bg" />
            <FetchingComponent />
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
                        {/* <Route path="/connect/:to" element={<Connect />} />
                        <Route path="/connect" element={<Connect />} /> */}
                        <Route path="/stake" element={<Stake />} />
                        <Route path="/rewards" element={<ClaimRewards />} />
                        <Route path="/gallery" element={<Gallery />} />
                        {/* <Route path="/error" element={<Error />} /> */}
                        {/* <Route path="/limit" element={<StakingLimitPopup />} /> */}
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
