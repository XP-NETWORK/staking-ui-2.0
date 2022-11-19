import React, { FC, useEffect, useState, useCallback } from "react";
import "./claimRewards.scss";
import classNames from "classnames";
import { APY, assetIdx, communityAddress, XPNET } from "../../assets/ts/Consts";
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
import { useSelector } from "react-redux";
import { Error } from "../../Components/Error/Error";
import {
  claimXPNET,
  createClients,
  // rewardPool,
} from "../../assets/ts/algoUtils";
import { Staking } from "../../assets/ts/StakingClient";

interface Props {}

export const ClaimRewards: FC<Props> = ({}) => {
  const [clients, setClients] = useState<Staking[]>();
  const [amount, setamount] = useState(0);
  const [amountStake, setAmountStake] = useState(0);
  const [showError, setShowError] = useState(false);
  const [mainImgSrc, setMainImgSrc] = useState(NFT);
  const [rewards, setRewards] = useState(0);
  const { signer, account } = useSelector(
    (state: ReduxState) => state.homePage
  );



  useEffect(() => {
    const getAmount = async () => {
      try {
        let stakedAmount = clients
          ? await (
              await Promise.all(clients.map((n) => n.getAccountState(account)))
            )
              .map((a) => a.dynamic_account_valuetsba)
              .filter((n) => n !== undefined)
              .reduce((a: any, b: any) => a + b, 0)
          : 0;

        if (stakedAmount < 0) {
          setShowError(true);
        } else {
          setShowError(false);
          setAmountStake(stakedAmount);
        }
      } catch {
        setAmountStake(0);
        setShowError(true);
      }
    };
    getAmount().catch(console.error);
  }, [account, clients]);

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
              app: BigInt(123937248),
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
    let stakingAmount;
    let rewards;
    if (clients !== undefined) {
      try {
        let client = clients[0];
        stakingAmount = await client.getAccountState(account);
        let sp = await client.getSuggestedParams();
        sp.flatFee = true;
        sp.fee = 7_000;

        const { dynamic_account_valuetsba } = stakingAmount;
        if (dynamic_account_valuetsba > 0) {
          // rewardPool(signer, account, client,stakingAmount);
          rewards = await client.unstake(
            {
              stakeId: BigInt(0),
              token: BigInt(assetIdx),
              app: BigInt(123937380),
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

  const handleNext = () => {};

  return (
    <>
      {!showError && (
        <div className="stakeWrapper">
          <div className={classNames("containerLeft", "container")}>
            <h1>Claim Rewards</h1>
            <label className="line" />
            {/* <div className="sectionWrapper"> */}
            <div className={classNames("sectionWrapper", "summaryBox")}>
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
                    <span className="small" style={{marginBottom: "10px"}}></span>
                    <label className="value">
                      {amountStake ? addCommas(amountStake) : 0} {XPNET}
                    </label>
                  </div>
                </div>
                <div
                  id="row2"
                  className={classNames("row", "paddingBottom", "mT17")}
                >
                  <label className="prop">APY</label>
                  <label className="value">{APY[3]} %</label>
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
                    <span className="small" style={{marginBottom: "10px"}}></span>
                    <label className="value">
                      {amount} {XPNET}
                    </label>
                  </div>
                </div>
                <div
                  id="row4"
                  className={classNames("row", "borderBottom", "mT17")}
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
                  <span>189 days left</span>
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
                  className={classNames("blueBtn", "blackBtn")}
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
                  <img src={left} alt="left" onClick={handlePrev} />
                </button>
                <img src={mainImgSrc} alt="NFT" className="imgMain" />
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
