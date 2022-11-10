import React, { FC, useState } from "react";
import "./claimRewards.scss";
import classNames from "classnames";
import { APY, NFT_SRC, XPNET } from "../../assets/ts/Consts";
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

interface Props {}

export const ClaimRewards: FC<Props> = ({}) => {
  const [amount, setamount] = useState(0);
  const [mainImgSrc, setMainImgSrc] = useState(NFT);

  const handleCopy = () => {};
  console.log(mainImgSrc);

  const handlePrev = () => {
    let num = mainImgSrc[mainImgSrc.length - 1] + 1;
    setMainImgSrc(`NFT${num}`);
  };
  const handleNext = () => {};
  return (
    <>
      <div className="stakeWrapper">
        <div className={classNames("containerLeft", "container")}>
          <h1>Claim Rewards</h1>
          <label className="line" />
          {/* <div className="sectionWrapper"> */}
          <div className={classNames("sectionWrapper", "summaryBox")}>
            <div className="periodsRewards">
              <div id="row1" className="row" style={{ alignItems: "flex-end" }}>
                <label className="prop">Amount</label>
                <div
                  className="column"
                  style={{ alignItems: "flex-end", gap: "9px" }}
                >
                  <span className="small">$ 0.070</span>
                  <label className="value">
                    {amount} {XPNET}
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
              <div id="row3" className="row" style={{ alignItems: "flex-end" }}>
                <label className="prop">Rewards</label>
                <div
                  className="column"
                  style={{ alignItems: "flex-end", gap: "9px" }}
                >
                  <span className="small">$ 0.070</span>
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
              <button className={classNames("blueBtn", "mt-0")}>
                Claim XPNET
              </button>
              <button className={classNames("blueBtn", "blackBtn")}>
                <img src={lock} />
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
                <img src={left} alt="left" onClick={handlePrev}/>
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
    </>
  );
};
