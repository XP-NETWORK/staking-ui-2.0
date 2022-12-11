/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useEffect, useState, ReactNode, useRef } from "react";
import { useNavigate } from "react-router";
import algorand from "../../assets/images/Algorand.svg";
import bsc from "../../assets/images/BSC.svg";
import bg from "../../assets/images/desk/bg.png";
import bgMob from "../../assets/images/mob/bg.png";
import classNames from "classnames";
import {
    BLOCKCHAINS,
    STAKING_LIMIT_ALGO,
    TOTAL_STAKED_BSC,
    XPNET,
} from "../../assets/ts/Consts";
import { addCommas } from "../../assets/ts/helpers";
import { ProgressBar } from "../../Components/ProgressBar/ProgressBar";
import "./home.scss";
import { useSelector } from "react-redux";
import { ReduxState } from "../../store/store";
import { useDispatch } from "react-redux";
import {
    setBlockchain,
    setConnectModalShow,
    setNavigateRoute,
} from "../../store/reducer/homePageSlice";
import { getTokenStaked } from "../../assets/ts/algoUtils";
import { createPortal } from "react-dom";
import ConnectModalBody from "../../Components/Modals/ConnectModalBody";

type ModalProps = {
    children: ReactNode;
};

function ConnectModal({ children }: ModalProps) {
    const x = document.createElement("div");
    const modalRoot = document.getElementById("modal-root") as HTMLElement;
    useEffect(() => {
        //const el = elRef.current!; // non-null assertion because it will never be null
        modalRoot?.appendChild(x);
        return () => {
            modalRoot?.removeChild(x);
        };
    }, []);

    return createPortal(children, x);
}

interface Props {}

export const Home: FC<Props> = () => {
    const [totalStakeInAlgo, setTotalStakeInAlgo] = useState(0);
    const [navigateTo, setNavigateTo] = useState<string>("");
    const { blockchain, account, evmAccount, showConnectModal } = useSelector(
        (state: ReduxState) => state.homePage
    );

    const ref = useRef();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleBlockchainSelect = (chan: string) => {
        switch (chan) {
            case "EVM":
                dispatch(setBlockchain(BLOCKCHAINS[1]));
                break;
            case "ALGO":
                dispatch(setBlockchain(BLOCKCHAINS[0]));
                break;
            default:
                break;
        }
    };

    const handleClickOnStake = (typeOfStake: string) => {
        // debugger;
        if (typeOfStake === "ALGO" ? account : evmAccount) {
            handleBlockchainSelect(typeOfStake);
            navigate("/stake");
        } else {
            handleBlockchainSelect(typeOfStake);
            dispatch(setConnectModalShow(true));
            dispatch(setNavigateRoute("/stake"));
        }
    };

    const handleClickOnClaim = (typeOfClaim: string) => {
        if (typeOfClaim === "ALGO" ? account : evmAccount) {
            handleBlockchainSelect(typeOfClaim);
            navigate("/rewards");
        } else {
            handleBlockchainSelect(typeOfClaim);
            dispatch(setConnectModalShow(true));
            dispatch(setNavigateRoute("/rewards"));
        }
    };

    useEffect(() => {
        const getTotal = async () => {
            const staked = await getTokenStaked();
            setTotalStakeInAlgo(staked);
        };
        getTotal();
    }, []);

    return (
        <>
            <div id="modal-root"></div>
            {showConnectModal && (
                <ConnectModal>
                    <ConnectModalBody />
                </ConnectModal>
            )}
            <img src={bg} className={classNames("bg", "deskOnly")} alt="bg" />
            <img src={bgMob} className={classNames("bg", "mobOnly")} alt="bg" />
            <div className="homeWrapper">
                <div>
                    <h1>Do more with XPNET</h1>
                    <p>
                        Delegate XPNET to validators to earn rewards and mint a
                        chain-agnostic NFT for free.
                    </p>
                </div>
                <div className="stakingBoxesWrapper">
                    <div className="box">
                        <label className="newStaking">
                            New staking opportunities
                        </label>
                        <div className="title">
                            <label>
                                <img src={algorand} alt="algo_img" />
                                Algorand
                            </label>
                            <div
                                className={classNames(
                                    "btnsContainer",
                                    "deskOnly"
                                )}
                            >
                                <button
                                    className="whiteBtn"
                                    onClick={() => handleClickOnStake("ALGO")}
                                >
                                    Stake XPNET
                                </button>
                                <button
                                    className="darkBtn"
                                    onClick={() => handleClickOnClaim("ALGO")}
                                >
                                    Claim XPNET
                                </button>
                            </div>
                        </div>
                        <div className="stakingLimit">
                            Staking Limit
                            <span>
                                {addCommas(STAKING_LIMIT_ALGO)} {XPNET}
                            </span>
                        </div>
                        <ProgressBar
                            totalStaking={totalStakeInAlgo}
                            stakingLimit={STAKING_LIMIT_ALGO}
                            chain={"algo"}
                        />
                        <div className={classNames("btnsContainer", "mobOnly")}>
                            <button
                                className="whiteBtn"
                                onClick={() => handleClickOnStake("ALGO")}
                            >
                                Stake XPNET
                            </button>
                            <button
                                className="darkBtn"
                                onClick={() => handleClickOnClaim("ALGO")}
                            >
                                Claim XPNET
                            </button>
                        </div>
                    </div>

                    <div className="box">
                        <div className="title">
                            <label>
                                <img src={bsc} alt="bsc_img" />
                                BSC
                            </label>
                            <div
                                className={classNames(
                                    "btnsContainer",
                                    "deskOnly"
                                )}
                            >
                                <button
                                    className="whiteBtn"
                                    onClick={() => handleClickOnStake("EVM")}
                                >
                                    Stake XPNET
                                </button>
                                <button
                                    className="darkBtn"
                                    onClick={() => handleClickOnClaim("EVM")}
                                >
                                    Claim XPNET
                                </button>
                            </div>
                        </div>
                        <div className="stakingLimit">
                            Staking Limit
                            <span>
                                {addCommas(TOTAL_STAKED_BSC)} {XPNET}
                            </span>
                        </div>
                        <ProgressBar
                            totalStaking={TOTAL_STAKED_BSC}
                            stakingLimit={TOTAL_STAKED_BSC}
                            chain={"BSC"}
                        />
                        <div className={classNames("btnsContainer", "mobOnly")}>
                            <button
                                className="whiteBtn"
                                onClick={() => handleClickOnStake("EVM")}
                            >
                                Stake XPNET
                            </button>
                            <button
                                className="darkBtn"
                                onClick={() => handleClickOnClaim("EVM")}
                            >
                                Claim XPNET
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
