import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import algorand from "../../assets/images/Algorand.svg";
import bsc from "../../assets/images/BSC.svg";
import bg from "../../assets/images/desk/bg.png";
import bgMob from "../../assets/images/mob/bg.png";

import classNames from "classnames";

import {
  STAKING_LIMIT_ALGO,
  TOTAL_STAKED_BSC,
  XPNET,
} from "../../assets/ts/Consts";
import { addCommas } from "../../assets/ts/helpers";

import { ProgressBar } from "../../Components/ProgressBar/ProgressBar";


import "./home.scss";

interface Props {}

export const Home: FC<Props> = ({}) => {
  const [totalStakeInAlgo, settotalStakeInAlgo] = useState(1);

  useEffect(() => {

  }, []);
  const navigate = useNavigate();

  const handleAlgoStake = () => {
    navigate("/connect/stake");
  };
  const handleAlgoClaimXPNET = () => {
    navigate("/connect/rewards");
  };

  return (
    <>
      {/* <div className="homeWrapperMargin"> */}
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
            <label className="newStaking">New staking opportunities</label>
            <div className="title">
              <label>
                <img src={algorand} />
                Algorand
              </label>
              <div className={classNames("btnsContainer", "deskOnly")}>
                <button className="whiteBtn" onClick={handleAlgoStake}>
                  Stake XPNET
                </button>
                <button className="darkBtn" onClick={handleAlgoClaimXPNET}>
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
            <ProgressBar totalStaking={totalStakeInAlgo} stakingLimit={STAKING_LIMIT_ALGO}/>
            <div className={classNames("btnsContainer", "mobOnly")}>
              <button className="whiteBtn" onClick={handleAlgoStake}>
                Stake XPNET
              </button>
              <button className="darkBtn" onClick={handleAlgoClaimXPNET}>
                Claim XPNET
              </button>
            </div>
          </div>

          <div className="box">
            <div className="title">
              <label>
                <img src={bsc} />
                BSC
              </label>
              <div className={classNames("btnsContainer", "deskOnly")}>
                <button className="whiteBtn" onClick={handleAlgoStake}>
                  Stake XPNET
                </button>
                <button className="darkBtn" onClick={handleAlgoClaimXPNET}>
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
            <ProgressBar totalStaking={TOTAL_STAKED_BSC} stakingLimit={TOTAL_STAKED_BSC} />
            <div className={classNames("btnsContainer", "mobOnly")}>
              <button className="whiteBtn" onClick={handleAlgoStake}>
                Stake XPNET
              </button>
              <button className="darkBtn" onClick={handleAlgoClaimXPNET}>
                Claim XPNET
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
};
