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
    setStakeDetails,
    setXPNetPrice,
} from "../../store/reducer/homePageSlice";
import { createClient, optInt, stake } from "../../assets/ts/algoUtils";
import {
    AlgoDetails,
    assetIdx,
    IActiveSessionSTake,
    XPNET,
} from "../../assets/ts/Consts";
import { getCurrentPrice } from "../../assets/ts/helpers";
import xpnet from "../../assets/images/coin/XPNET.svg";
import nft from "../../assets/images/nft.png";
import info from "../../assets/images/info.svg";
import unchecked from "../../assets/images/checkbox/unchecked.svg";
import checked from "../../assets/images/checkbox/checked.svg";
import "./stake.scss";
import { StakingPeriod } from "../../Components/StakingPeriods/StakingPeriod";
import { OPTINButton } from "../../Components/Buttons/OPTINButton";
import { STAKEButton } from "../../Components/Buttons/STAKEButton";
import { ThreeCircles } from "react-loader-spinner";

interface Props {}

export const Stake: FC<Props> = ({}) => {
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
    const [duration, setDuration] = useState(3);
    const [isAgree, setIsAgree] = useState(false);
    const [optInApps, setOptInApps] = useState(false);
    const [loader, setLoader] = useState(false);
    const { signer, account, evmAccount, stakingClient, algoDetails, balance } =
        useSelector((state: ReduxState) => state.homePage);

    const handleMaxAmount = () => {
        setAmount(balance);
    };

    const handleChangeAmount = (e: any) => {
        setAmount(e.target.value);
    };

    const handleFocusAmount = (e: any) => {
        var Url = document.getElementById("amount-box") as HTMLInputElement;
        Url.select();
    };

    const handleStake = async () => {
        setLoader(true);
        try {
            const resp = await stake(
                account,
                Number(amount),
                stakingClient,
                algoDetails
            );
            let _stake: IActiveSessionSTake;
            _stake = { txID: resp.txID, txInfo: resp.txInfo };
            dispatch(setActiveSessionStakes(_stake));
        } catch (error) {
            console.log(error);
        }
        setLoader(false);
    };

    const optIntAsset = async () => {
        const resp = await optInt(stakingClient);
        setOptInResponse(resp);
    };

    useEffect(() => {
        const getBalance = async () => {
            if (stakingClient.sender !== "") {
                const _accountInformation = await stakingClient.client
                    .accountInformation(stakingClient.sender)
                    .do();
                setOptInApps(_accountInformation["apps-local-state"]);
                const assetInfo = await stakingClient.client
                    .accountAssetInformation(stakingClient.sender, assetIdx)
                    .do();
                const balance = assetInfo["asset-holding"]["amount"];
                // setBalance(balance);
                dispatch(setBalance(balance));
            }
        };
        if (account) getBalance().catch(console.error);
        const getCurrency = async () => {
            let currency = await getCurrentPrice();
            dispatch(setXPNetPrice(currency));
            setCurrentXpnetPrice(currency);
        };
        getCurrency().catch(console.error);
    }, [stakingClient, optInResponse,dispatch,account]);

    useEffect(() => {
        let stake = {
            amount: amount,
            stakingPeriod: duration,
            isAgree: isAgree,
        };
        dispatch(setStakeDetails({ ...stake }));
    }, [amount, duration, isAgree, dispatch]);

    useEffect(() => {
        const algoDetails = new AlgoDetails(duration);
        dispatch(setAlgoDetails(algoDetails));
        const updateClient = async () => {
            let client = await createClient(signer, account, duration);
            dispatch(setClient(client));
        };
        if (account) updateClient().catch(console.error);
    }, [duration, dispatch, signer, account]);

    if (!account && !evmAccount) return <Navigate to="/" replace />;
    else
        return loader ? (
            <div className="claim-rewards-loader">
                <ThreeCircles
                    height="100"
                    width="100"
                    color="#E22440"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                    ariaLabel="three-circles-rotating"
                    outerCircleColor=""
                    innerCircleColor=""
                    middleCircleColor=""
                />
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
                                    {`Balance: ${balance} XPNET`}
                                </label>
                            </div>
                            <div className="row">
                                <div className="amountInput">
                                    <input
                                        id="amount-box"
                                        type="number"
                                        onFocus={handleFocusAmount}
                                        onChange={(e) => handleChangeAmount(e)}
                                        value={amount}
                                        // defaultValue={0}
                                        placeholder={"0"}
                                        // placeholder={`${amount} MIN staking requirement 1500 XPNET`}
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

                                {/* <input
                type="text"
                className="amountInput"
                placeholder={`${amount} MIN staking requirement 1500 XPNET`}
              /> */}
                            </div>
                            <label className="titleProp">
                                Select staking period
                            </label>
                            <div className={classNames("row", "wrapPeriods")}>
                                {periods.map((e, i) => {
                                    return (
                                        <StakingPeriod
                                            key={i}
                                            duration={(i + 1) * 3}
                                            setDuration={setDuration}
                                            durationSelected={duration}
                                        />
                                    );
                                })}
                            </div>
                            <div className="containerNft">
                                <img src={nft} alt="nft_img" />
                                <div>
                                    <label>
                                        Don’t wait for 3 months - get a free NFT
                                        right NOW
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
                                            {amount} {XPNET}
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
                                        {/* {calculatAPY(duration)} % */}
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
                                                currentXpnetPrice * amount
                                            ).toFixed(2)}
                                        </span>
                                        <label className="value">
                                            {/* {calculateEstimatedRewards(
                                                amount,
                                                duration
                                            )}{" "} */}
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
                                        {/* {calculateEndDate(duration)} */}
                                    </label>
                                </div>
                            </div>
                            <div className={classNames("row", "flexStart")}>
                                <img
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
                                <STAKEButton
                                    handleStake={handleStake}
                                    isAgree={isAgree}
                                    optInApps={optInApps}
                                    durationSelected={duration}
                                />
                                <OPTINButton
                                    optIntAsset={optIntAsset}
                                    optInApps={optInApps}
                                    durationSelected={duration}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
};
