import { FC, useEffect, useState } from "react";
import classNames from "classnames";
import { useSelector } from "react-redux";
import { APY, assetIdx, subAppId, XPNET } from "../../assets/ts/Consts";
import { addCommas, calculateEndDate } from "../../assets/ts/helpers";
import lock from "../../assets/images/lock.svg";
import { Navigate, useNavigate } from "react-router-dom";
import { ProgressStaking } from "../../Components/ProgressStaking/ProgressStaking";
import NFT from "../../assets/images/nftRewards/0.jpeg";
import { ReduxState } from "../../store/store";
import { Error } from "../../Components/Error/Error";
import { Staking } from "../../assets/ts/StakingClient";
import { HOCClaimRewards } from "./HOCClaimRewards";
import "./claimRewards.scss";
import { getTokenOfOwnerByIndex } from "../../assets/ts/evmUtils";
import { useDispatch } from "react-redux";
import { setEVMStakesArray } from "../../store/reducer/homePageSlice";
import { NFTRewards } from "./Rewards";

interface Props {
    chain: string;
}

const ClaimRewards = ({ chain }: Props) => {
    const dispatch = useDispatch();
    const [clients, setClients] = useState<Staking[]>();
    const [amount, setamount] = useState(0);
    const [amountStake, setAmountStake] = useState(0);
    const [showError, setShowError] = useState(false);
    const [mainImgSrc, setMainImgSrc] = useState(NFT);
    const navigate = useNavigate();
    const algoDetails = useSelector(
        (state: ReduxState) => state.homePage.algoDetails
    );
    const [apy, setApy] = useState(APY[3]);
    const [btnActive, setBtnActive] = useState(1);
    const [earned, setEarned] = useState(0);
    const { evmStakes, account, evmAccount, evmStakesArray } = useSelector(
        (state: ReduxState) => state.homePage
    );

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
                            lockTime: BigInt(algoDetails.duration),
                            app: subAppId,
                        },
                        { suggestedParams: sp }
                    );
                }
            } catch (e) {
                console.error(JSON.parse(JSON.stringify(e)));
            }
        }
    };

    const handleUnstake = async () => {
        let rewards;
        if (clients !== undefined) {
            try {
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

    const handlePrev = () => {
        let num = mainImgSrc[mainImgSrc.length - 1] + 1;
        setMainImgSrc(`NFT${num}`);
    };

    useEffect(() => {
        const getEVMStakes = async (evmStakes: any) => {
            const tokens = await getTokenOfOwnerByIndex(evmStakes, evmAccount);
            dispatch(setEVMStakesArray(tokens));
        };
        if (chain === "BSC" && evmStakes) {
            getEVMStakes(evmStakes);
        }
    }, [chain, evmAccount, evmStakes]);

    if (!account && !evmAccount) return <Navigate to="/" replace />;
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
                                        <span
                                            className="small"
                                            style={{ marginBottom: "10px" }}
                                        ></span>
                                        <span className="small">
                                            $ {amount.toFixed(2)}
                                        </span>
                                        <label className="value">
                                            {`${amountStake * 1e6} XPNET`}
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
                                        <span
                                            className="small"
                                            style={{ marginBottom: "10px" }}
                                        ></span>
                                        <span className="small">
                                            $ {amount.toFixed(2)}
                                        </span>
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
                                    <label className="value">
                                        {/* {calculateEndDate(duration)} */}
                                    </label>
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
                                    {/* <span>{diffDays} left</span> */}
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
                    <NFTRewards stakes={evmStakesArray} />
                    {/* <div className={classNames("containerRight", "container")}>
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
                                    // onClick={handleCopy}
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
                    </div> */}
                </div>
            )}

            {showError && <Error />}
        </>
    );
};

export default HOCClaimRewards(ClaimRewards);
