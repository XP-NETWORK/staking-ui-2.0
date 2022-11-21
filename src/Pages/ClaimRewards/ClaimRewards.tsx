import { FC, useEffect, useState } from "react";
import classNames from "classnames";
import { useSelector } from "react-redux";
import moment from "moment";

import {
    appAdress3Months,
    appAdress6Months,
    appAdress9Months,
    APY,
    assetIdx,
    communityAddress,
    duration3Months,
    multiplier12Months,
    subAppId,
    XPNET,
} from "../../assets/ts/Consts";
import { addCommas } from "../../assets/ts/helpers";
import xpnet from "../../assets/images/coin/XPNET.svg";
import left from "../../assets/images/left.svg";
import right from "../../assets/images/right.svg";
import copy from "../../assets/images/copy.svg";
import checked from "../../assets/images/checkbox/checked.svg";
import lock from "../../assets/images/lock.svg";
import { Link } from "react-router-dom";
import { ProgressStaking } from "../../Components/ProgressStaking/ProgressStaking";
import NFT from "../../assets/images/nftRewards/0.jpeg";
import NFT1 from "../../assets/images/nftRewards/1.jpeg";
import NFT2 from "../../assets/images/nftRewards/2.jpeg";
import NFT3 from "../../assets/images/nftRewards/3.jpeg";
import NFT4 from "../../assets/images/nftRewards/4.jpeg";
import { ReduxState } from "../../store/store";
import { Error } from "../../Components/Error/Error";
import {
    claimXPNET,
    createClients,
    // rewardPool,
} from "../../assets/ts/algoUtils";
import { Staking } from "../../assets/ts/StakingClient";

import "./claimRewards.scss";

interface Props {}

export const ClaimRewards: FC<Props> = ({}) => {
    const [clients, setClients] = useState<Staking[]>();
    const [amount, setamount] = useState(0);
    const [amountStake, setAmountStake] = useState(0);
    const [showError, setShowError] = useState(false);
    const [mainImgSrc, setMainImgSrc] = useState(NFT);

    const [appId, setAppId] = useState(appAdress3Months);
    const [duration, setDuration] = useState(duration3Months);
    const [apy, setApy] = useState(APY[3]);
    const [btnActive, setBtnActive] = useState(1);
    const [earned, setEarned] = useState(0);

    const { signer, account } = useSelector(
        (state: ReduxState) => state.homePage
    );

    useEffect(() => {
        const getAmount = async () => {
            if (clients !== undefined) {
                try {
                    let earnedAmt: any = await clients[btnActive - 1]
                        .getEarned({
                            address: account,
                        })
                        .then((n) => Number(n.value) / 1e6)
                        .catch(() => 0);

                    let stakeAmt: any = clients[btnActive - 1]
                        ? await clients[btnActive - 1]
                              .getAccountState(account)
                              .then(
                                  (n) =>
                                      Number(n.dynamic_account_valuetsba) / 1e6
                              )
                              .catch(() => 0)
                        : 0;

                    setEarned(earnedAmt);
                    if (stakeAmt < 0) {
                        setShowError(true);
                    } else {
                        setShowError(false);
                        setAmountStake(stakeAmt);
                    }
                } catch {
                    setAmountStake(0);
                    setShowError(true);
                }
            }
        };
        getAmount().catch(console.error);
    }, [account, clients, btnActive]);

    const handleClaimXPNET = async () => {
        let stakingAmount;
        if (clients !== undefined) {
            let client = clients[0];
            stakingAmount = await client.getAccountState(account);

            const { dynamic_account_valuetsba } = stakingAmount;

            try {
                let sp = await client.getSuggestedParams();
                sp.flatFee = true;
                sp.fee = 7_000;

                if (dynamic_account_valuetsba > 0) {
                    await client.getReward(
                        {
                            token: BigInt(assetIdx),
                            app: subAppId,
                        },
                        { suggestedParams: sp }
                    );
                }
            } catch (e) {
                console.error(JSON.parse(JSON.stringify(e)));
            }
        }

        // });
    };

    const handleUnstake = async () => {
        let rewards;
        if (clients !== undefined) {
            try {
                console.log(clients);

                let client = clients[0];
                let sp = await client.getSuggestedParams();
                sp.flatFee = true;
                sp.fee = 7_000;

                if (amountStake > 0) {
                    rewards = await client.unstake(
                        {
                            stakeId: BigInt(0),
                            token: BigInt(assetIdx),
                            app: subAppId,
                            clawback: communityAddress,
                        },
                        { suggestedParams: sp }
                    );

                    console.log(rewards);
                }
            } catch (e) {
                console.log(e);
            }
        }
    };

    useEffect(() => {
        const getClients = async () => {
            let clientsArr = await createClients(signer, account);
            setClients(clientsArr);
        };
        getClients().catch(console.error);
    }, [account, signer]);

    const handleCopy = () => {};

    const handlePrev = () => {
        let num = mainImgSrc[mainImgSrc.length - 1] + 1;
        setMainImgSrc(`NFT${num}`);
    };

    const handleNext = () => {
        // let num = mainImgSrc[mainImgSrc.length] + 1;
        // setMainImgSrc(`NFT${num}`);
    };

    const activeClaim = (num: number) => {
        switch (num) {
            case 1:
                setAppId(appAdress3Months);
                setApy(APY[3]);
                setBtnActive(1);
                break;
            case 2:
                setAppId(appAdress6Months);
                setApy(APY[6]);
                setBtnActive(2);

                break;
            case 3:
                setAppId(appAdress9Months);
                setApy(APY[9]);
                setBtnActive(3);

                break;
            case 4:
                setAppId(multiplier12Months);
                setApy(APY[12]);
                setBtnActive(4);

                break;
            default:
                setAppId(appAdress3Months);
                setApy(APY[3]);
                setBtnActive(1);
        }
    };

    let diffDays = moment(3001300 * 1000 + 7890000 * 1000).toNow();
    // console.log(diffDays);

    return (
        <>
            {!showError && (
                <div className="stakeWrapper">
                    <div className={classNames("containerLeft", "container")}>
                        <h1>Claim Rewards</h1>
                        <label className="line" />
                        {/* <div className="sectionWrapper"> */}
                        <div
                            className={classNames(
                                "sectionWrapper",
                                "summaryBox"
                            )}
                        >
                            <div className="chooseClaim">
                                <button
                                    className={
                                        btnActive === 1 ? "btnActive" : ""
                                    }
                                    onClick={() => activeClaim(1)}
                                >
                                    3 months
                                </button>
                                <button
                                    className={
                                        btnActive === 2 ? "btnActive" : ""
                                    }
                                    onClick={() => activeClaim(2)}
                                >
                                    6 months
                                </button>
                                <button
                                    className={
                                        btnActive === 3 ? "btnActive" : ""
                                    }
                                    onClick={() => activeClaim(3)}
                                >
                                    9 months
                                </button>
                                <button
                                    className={
                                        btnActive === 4 ? "btnActive" : ""
                                    }
                                    onClick={() => activeClaim(4)}
                                >
                                    {" "}
                                    1 year
                                </button>
                            </div>
                            <div className="periodsRewards">
                                <div
                                    id="row1"
                                    className="row"
                                    style={{ alignItems: "flex-end" }}
                                >
                                    <label className="prop">Amount</label>
                                    <div
                                        className="column"
                                        style={{
                                            alignItems: "flex-end",
                                            gap: "9px",
                                        }}
                                    >
                                        {/* <span className="small" style={{}}>$ 0.070</span> */}
                                        <span
                                            className="small"
                                            style={{ marginBottom: "10px" }}
                                        ></span>
                                        <label className="value">
                                            {amountStake
                                                ? addCommas(amountStake)
                                                : 0}{" "}
                                            {XPNET}
                                        </label>
                                    </div>
                                </div>
                                <div
                                    id="row2"
                                    className={classNames(
                                        "row",
                                        "paddingBottom",
                                        "mT17"
                                    )}
                                >
                                    <label className="prop">APY</label>
                                    <label className="value">{apy} %</label>
                                </div>
                                <div
                                    id="row3"
                                    className="row"
                                    style={{ alignItems: "flex-end" }}
                                >
                                    <label className="prop">Rewards</label>
                                    <div
                                        className="column"
                                        style={{
                                            alignItems: "flex-end",
                                            gap: "9px",
                                        }}
                                    >
                                        {/* <span className="small">$ 0.070</span> */}
                                        <span
                                            className="small"
                                            style={{ marginBottom: "10px" }}
                                        ></span>
                                        <label className="value">
                                            {earned ? addCommas(earned) : 0}{" "}
                                            {XPNET}
                                        </label>
                                    </div>
                                </div>
                                <div
                                    id="row4"
                                    className={classNames(
                                        "row",
                                        "borderBottom",
                                        "mT17"
                                    )}
                                >
                                    <label className="prop">End Date</label>
                                    <label className="value">{APY[3]} %</label>
                                </div>
                            </div>
                            {/* <div className={classNames("row", "flexStart")}>
              <img src={unchecked} />
              <p className="agree">
                I have read and I agree to the{" "}
                <span>XPNET Staking Service Agreement</span>
              </p>
            </div> */}
                            <div className="stakingDurDiv">
                                <div className="row">
                                    Staking duration
                                    <span>{diffDays} left</span>
                                </div>
                                <ProgressStaking />
                            </div>
                            <div className="column">
                                <button
                                    className={classNames("blueBtn", "mt-0")}
                                    onClick={handleClaimXPNET}
                                >
                                    Claim XPNET
                                </button>
                                <button
                                    className={classNames(
                                        "blueBtn",
                                        "blackBtn"
                                    )}
                                    onClick={handleUnstake}
                                >
                                    <img src={lock} alt="lock_img" />
                                    Unstake
                                </button>
                            </div>
                        </div>
                        {/* </div> */}
                    </div>

                    <div className={classNames("containerRight", "container")}>
                        <h1>NFT Rewards</h1>
                        <label className="line" />
                        <div className={classNames("sectionWrapper")}>
                            <div className="rewardsContainerMain">
                                <button className="btnWrap">
                                    <img
                                        src={left}
                                        alt="left"
                                        onClick={handlePrev}
                                    />
                                </button>
                                <img
                                    src={mainImgSrc}
                                    alt="NFT"
                                    className="imgMain"
                                />
                                <button className="btnWrap">
                                    <img src={right} alt="right" />
                                </button>
                            </div>
                            <div className="copyContainer">
                                <label>{mainImgSrc}</label>
                                <img
                                    src={copy}
                                    alt="copy"
                                    onClick={handleCopy}
                                    className="copyBtn"
                                />
                            </div>
                            <div className="nftsRewardsContainer">
                                <div>
                                    <img
                                        src={NFT}
                                        alt="nft"
                                        onClick={() => setMainImgSrc(NFT)}
                                        style={{
                                            border: `${
                                                mainImgSrc === NFT
                                                    ? " 4px solid rgba(229, 232, 240, 0.1)"
                                                    : "4px solid rgba(45, 45, 48, 0.4)"
                                            }`,
                                        }}
                                    />
                                    <img
                                        src={NFT1}
                                        alt="nft"
                                        onClick={() => setMainImgSrc(NFT1)}
                                        style={{
                                            border: `${
                                                mainImgSrc === NFT1
                                                    ? " 4px solid rgba(229, 232, 240, 0.1)"
                                                    : "4px solid rgba(45, 45, 48, 0.4)"
                                            }`,
                                        }}
                                    />
                                    <img
                                        src={NFT2}
                                        alt="nft"
                                        onClick={() => setMainImgSrc(NFT2)}
                                        style={{
                                            border: `${
                                                mainImgSrc === NFT2
                                                    ? " 4px solid rgba(229, 232, 240, 0.1)"
                                                    : "4px solid rgba(45, 45, 48, 0.4)"
                                            }`,
                                        }}
                                    />
                                    <img
                                        src={NFT3}
                                        alt="nft"
                                        onClick={() => setMainImgSrc(NFT3)}
                                        style={{
                                            border: `${
                                                mainImgSrc === NFT3
                                                    ? " 4px solid rgba(229, 232, 240, 0.1)"
                                                    : "4px solid rgba(45, 45, 48, 0.4)"
                                            }`,
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showError && <Error />}
        </>
    );
};
