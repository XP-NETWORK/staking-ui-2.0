import { FC, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import classNames from "classnames";
import { useSelector, useDispatch } from "react-redux";
import PDF from "../../assets/Terms.pdf";
import { ReduxState } from "../../store/store";
import {
    setActiveSessionStakes,
    setAlgoDetails,
    setBalance,
    setClient,
    setErrorModal,
    setOptInedApps,
    setRefreshTheAlgoRewards,
    setStakeDetails,
    setStakingNotification,
    setXPNetPrice,
    setAmountError,
    setCancelledTrx,
} from "../../store/reducer/homePageSlice";
import {
    checkOptInApps,
    createClient,
    formatTheNumber,
    getAlgoStakeEndDate,
    getAPY,
    getXpNetBalance,
    optInt,
    stake,
} from "../../assets/ts/algoUtils";
import {
    AlgoDetails,
    IActiveSessionSTake,
    XPNET,
} from "../../assets/ts/Consts";
import {
    calculateEstimatedRewards,
    getCurrentPrice,
} from "../../assets/ts/helpers";
import xpnet from "../../assets/images/coin/XPNET.svg";
import nft from "../../assets/images/nft.png";
import info from "../../assets/images/info.svg";
import unchecked from "../../assets/images/checkbox/unchecked.svg";
import checked from "../../assets/images/checkbox/checked.svg";
import "./stake.scss";
import { StakingPeriod } from "../../Components/StakingPeriods/StakingPeriod";
import { OPTINButton } from "../../Components/Buttons/OPTINButton";
import { STAKEButton } from "../../Components/Buttons/STAKEButton";

import moment from "moment";
import StakingPeriods from "../../Components/StakingPeriods/StakingPeriods";

import { StakingHistory } from "../../Components/StakingHistory/StakingHistory";
import { WavesLoader } from "../../Components/Loaders/WavesLoader";

/*type NoXpNetModalProps = {
    children: ReactNode;
};

function NoXpNetModal({ children }: NoXpNetModalProps) {
    const modalRoot = document.querySelector("#no-xp-modal") as HTMLElement;

    const elRef = useRef<HTMLDivElement | null>(null);
    if (!elRef.current) elRef.current = document.createElement("div");

    useEffect(() => {
        const el = elRef.current!; // non-null assertion because it will never be null
        modalRoot?.appendChild(el);
        return () => {
            modalRoot.removeChild(el);
        };
    }, []);
    return createPortal(children, elRef.current);
}*/

interface Props {}

export const Stake: FC<Props> = () => {
    const periods = new Array(4);
    periods.fill((e: any, index: number) => {
        return (
            <StakingPeriod
                duration={(index + 1) * 3}
                setDuration={setDuration}
                durationSelected={duration}
            />
        );
    });
    const dispatch = useDispatch();
    const [currentXpnetPrice, setCurrentXpnetPrice] = useState(0);
    const [optInResponse, setOptInResponse] = useState("");
    const [amount, setAmount] = useState(0);
    const [duration, setDuration] = useState(12);
    const [isAgree, setIsAgree] = useState(false);
    const [optInApps, setOptInApps] = useState(false);
    const [loader, setLoader] = useState(false);
    const [inputErr, setInputErr] = useState(false);
    const toDayInUnix = moment().unix();
    const {
        signer,
        account,
        evmAccount,
        stakingClient,
        algoDetails,
        balance,
        activeSessionStakes,
        amountError,
    } = useSelector((state: ReduxState) => state.homePage);

    const handleMaxAmount = () => {
        setAmount(balance / 1e6);
    };

    const handleChangeAmount = (e: any) => {
        if (e.target.value > 0) {
            dispatch(setAmountError(false));
            if (e.target.value < 1500) {
                setAmount(e.target.value);
                setInputErr(true);
            } else {
                setAmount(e.target.value);
                setInputErr(false);
            }
        } else setAmount(0);
    };

    const handleInputOnBlur = () => {
        if (inputErr) {
            setAmount(0);
            setInputErr(false);
        }
    };

    const handleFocusAmount = () => {
        const Url = document.getElementById("amount-box") as HTMLInputElement;
        Url.select();
    };

    /* const algoRewardsAndStakes = async () => {
        // debugger;
        let stakes = await getAllAlgoStakes(account);
        let int;
        if (!stakes) {
            window.setInterval(async () => {
                stakes = await getAllAlgoStakes(account);
            }, 5000);
        } else clearInterval(int);
        return stakes;
    };*/

    const handleStake = async () => {
        if (!amount) {
            return dispatch(setAmountError(true));
        }
        setLoader(true);
        let _stake: IActiveSessionSTake;
        try {
            //let resp;
            //for (let i = 0; i < 10; i++) {
            const resp = await stake(
                account,
                Number(amount * 1e6),
                stakingClient,
                algoDetails
            );
            // console.log(resp.txID, "resp.txID");
            //await new Promise((r) => setTimeout(r, 5000));
            // }

            _stake = {
                txID: resp.txID,
                txInfo: resp.txInfo,
                amount: Number(amount),
                details: algoDetails,
            };
            dispatch(setActiveSessionStakes(_stake));
            dispatch(setRefreshTheAlgoRewards());
            dispatch(setStakingNotification("success"));
        } catch (error: any) {
            if (error.message?.includes("Operation cancelled")) {
                dispatch(setCancelledTrx(true));
                setLoader(false);
                return;
            }

            dispatch(setStakingNotification("fail"));
            console.log(error);
        }
        setLoader(false);
    };

    const optIntAsset = async () => {
        setLoader(true);
        try {
            const resp = await optInt(stakingClient);
            setOptInResponse(resp);
        } catch (error) {
            console.log(error);
            setLoader(false);
        }
        setLoader(false);
    };

    useEffect(() => {
        // ! NEED
        const optInApps = async () => {
            const apps = await checkOptInApps(stakingClient);
            if (!apps) return;
            const optInApps = apps["apps-local-state"].map((element: any) => {
                return element.id;
            });

            dispatch(setOptInedApps(optInApps));
            setOptInApps(optInApps);
        };
        optInApps();
    }, [optInResponse, stakingClient]);

    useEffect(() => {
        // debugger;
        const getBalance = async () => {
            const balance = await getXpNetBalance(stakingClient);

            if (balance) {
                dispatch(setErrorModal(false));
                dispatch(setBalance(balance));
            } else if (!balance) {
                dispatch(setErrorModal(true));
                console.log("Oh nooooooo");
            }
        };
        if (account) {
            getBalance().catch(console.error);
        }
        const getCurrency = async () => {
            const currency = await getCurrentPrice();
            dispatch(setXPNetPrice(currency));
            setCurrentXpnetPrice(currency);
        };
        getCurrency().catch(console.error);
    }, [stakingClient, activeSessionStakes, account]);

    useEffect(() => {
        dispatch(
            setStakeDetails({
                amount: amount,
                stakingPeriod: duration,
                isAgree: isAgree,
            })
        );
    }, [amount, duration, isAgree]);

    useEffect(() => {
        const algoDetails = new AlgoDetails(duration);
        dispatch(setAlgoDetails(algoDetails));
        const updateClient = async () => {
            const client = await createClient(signer, account, duration);
            dispatch(setClient(client));
        };
        if (account) {
            updateClient().catch(console.error);
        }
    }, [duration, signer, account]);

    if (!account && !evmAccount) return <Navigate to="/" replace />;
    else
        return loader ? (
            <div className="claim-rewards-loader">
                <WavesLoader />
            </div>
        ) : (
            <>
                <div className="stakeWrapper">
                    <div className={classNames("containerLeft", "container")}>
                        <h1>Stake XPNET</h1>
                        <label className="line" />
                        <div className="sectionWrapper">
                            <div className="row">
                                <label className="titleProp">
                                    Enter XPNET amount
                                </label>
                                <label
                                    className="titleProp"
                                    style={{ opacity: "1" }}
                                >
                                    {`Balance: ${
                                        balance
                                            ? formatTheNumber(balance / 1e6)
                                            : 0
                                    } XPNET`}
                                </label>
                            </div>
                            <div className="row stake-amount-input__container">
                                <div
                                    className={`amountInput${
                                        inputErr || amountError ? "--error" : ""
                                    }`}
                                >
                                    <input
                                        id="amount-box"
                                        type="number"
                                        onFocus={handleFocusAmount}
                                        onChange={(e) => handleChangeAmount(e)}
                                        onBlur={handleInputOnBlur}
                                        value={amount ? amount : ""}
                                        // placeholder={"0"}
                                    />
                                    <label
                                        className="placeholder deskOnly"
                                        style={{
                                            visibility:
                                                amount === 0
                                                    ? "visible"
                                                    : "hidden",
                                        }}
                                    >
                                        MIN staking requirement 1500 XPNET
                                    </label>
                                    <label
                                        className="placeholder mobOnly"
                                        style={{
                                            visibility:
                                                amount === 0
                                                    ? "visible"
                                                    : "hidden",
                                        }}
                                    >
                                        MIN 1500 XPNET
                                    </label>
                                    <button
                                        className="maxBtn"
                                        onClick={handleMaxAmount}
                                    >
                                        MAX
                                    </button>
                                </div>
                                <label className="tokenLabel">
                                    <img src={xpnet} alt="xpnet" />
                                    {XPNET}
                                </label>

                                <div
                                    className="stake-amount-input-error"
                                    style={{
                                        visibility: !inputErr
                                            ? "hidden"
                                            : "visible",
                                    }}
                                >
                                    Minimum staking requirement is 1500 XPNET{" "}
                                </div>
                            </div>
                            <label className="titleProp staking-period-title">
                                Select staking period
                            </label>
                            <StakingPeriods
                                // periods={periods}
                                setDuration={setDuration}
                                duration={duration}
                            />
                            <div className="containerNft">
                                <img src={nft} alt="nft_img" />
                                <div>
                                    <label>
                                        Don’t wait for 3 months - get a free NFT
                                        right NOW!
                                    </label>
                                    <p>
                                        A unique chain-agnostic NFT that serves
                                        as the access key to staking rewards.
                                    </p>
                                    <Link to="/gallery" className="linkNft">
                                        View NFT collection
                                    </Link>
                                </div>
                            </div>
                            <div className="warningDiv">
                                <img src={info} alt="info_img" />
                                <div className="column">
                                    <label>Don’t sell your XPNET NFT</label>
                                    <p>
                                        If you sell this NFT, you’ll lose the
                                        right to claim the XPNET rewards, though
                                        you’ll still be able to withdraw the
                                        staking deposit once it matures.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={classNames("containerRight", "container")}>
                        <h1>Summary</h1>
                        <label className="line" />
                        <div
                            className={classNames(
                                "sectionWrapper",
                                "summaryBox"
                            )}
                        >
                            <div className="periods">
                                <div
                                    id="row1"
                                    className={classNames("row")}
                                    style={{ alignItems: "flex-end" }}
                                >
                                    <label className="prop">
                                        Staking Amount
                                    </label>
                                    <div
                                        className="column"
                                        style={{
                                            alignItems: "flex-end",
                                            gap: "9px",
                                        }}
                                    >
                                        <span className="small">
                                            ${" "}
                                            {(
                                                currentXpnetPrice * amount
                                            ).toFixed(2)}
                                        </span>
                                        <label className="value">
                                            {formatTheNumber(amount)} {XPNET}
                                        </label>
                                    </div>
                                </div>
                                <div
                                    id="row2"
                                    className={classNames(
                                        "row",
                                        "borderBottom",
                                        "mt-7"
                                    )}
                                >
                                    <label className="prop">Est. APY</label>
                                    <label className="value">
                                        {getAPY(algoDetails)} %
                                    </label>
                                </div>
                                <div
                                    id="row3"
                                    className="row"
                                    style={{ alignItems: "flex-end" }}
                                >
                                    <label className="prop">
                                        Estimated Rewards
                                    </label>
                                    <div
                                        className="column"
                                        style={{
                                            alignItems: "flex-end",
                                            gap: "9px",
                                        }}
                                    >
                                        <span className="small">
                                            ${" "}
                                            {(
                                                currentXpnetPrice *
                                                calculateEstimatedRewards(
                                                    amount,
                                                    duration
                                                )
                                            ).toFixed(2)}
                                        </span>
                                        <label className="value">
                                            {formatTheNumber(
                                                calculateEstimatedRewards(
                                                    amount,
                                                    duration
                                                )
                                            )}{" "}
                                            {XPNET}
                                        </label>
                                    </div>
                                </div>
                                <div
                                    id="row4"
                                    className={classNames(
                                        "row",
                                        "borderBottom",
                                        "mt-7"
                                    )}
                                >
                                    <label className="prop">End Date</label>
                                    <label className="value">
                                        {getAlgoStakeEndDate(
                                            algoDetails?.duration,
                                            toDayInUnix?.toString()
                                        )}
                                    </label>
                                </div>
                            </div>
                            <div className={classNames("row", "flexStart")}>
                                <img
                                    className={`agreementCheck ${
                                        !isAgree ? "glowing" : ""
                                    }`}
                                    src={isAgree ? checked : unchecked}
                                    alt="checked"
                                    onClick={() => setIsAgree(!isAgree)}
                                />
                                <p className="agree">
                                    I have read and I agree to the{" "}
                                    <span>
                                        <a
                                            href={PDF}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="agreeA"
                                        >
                                            XPNET Staking Service Agreement
                                        </a>
                                    </span>
                                </p>
                            </div>
                            <div className="column">
                                <OPTINButton
                                    optIntAsset={optIntAsset}
                                    optInApps={optInApps}
                                    durationSelected={duration}
                                    isAgree={isAgree}
                                />
                                <STAKEButton
                                    handleStake={handleStake}
                                    isAgree={isAgree}
                                    optInApps={optInApps}
                                    durationSelected={duration}
                                    inputErr={inputErr}
                                    amount={amount}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <StakingHistory />
            </>
        );
};
