import React, { FC, useState } from "react";
import "./stake.scss";
import classNames from "classnames";
import { APY, XPNET } from "../../assets/ts/Consts";
import { addCommas } from "../../assets/ts/helpers";
import xpnet from "../../assets/images/coin/XPNET.svg";
import nft from "../../assets/images/nft.png";
import info from "../../assets/images/info.svg";
import unchecked from "../../assets/images/checkbox/unchecked.svg";
import checked from "../../assets/images/checkbox/checked.svg";
import lock from "../../assets/images/lock.svg";

import { Link } from "react-router-dom";

interface Props {}

export const Stake: FC<Props> = ({}) => {
  const [balance, setbalance] = useState(0);
  const [amount, setamount] = useState(0);
  const [duration, setDuration] = useState(3);
  const [apyPrecent, setapyPrecent] = useState();
  const [isAgree, setIsAgree] = useState(false);
  const handleMaxAmount = () => {};

  return (
    <>
      <div className="stakeWrapper">
        <div className={classNames("containerLeft", "container")}>
          <h1>Stake XPNET</h1>
          <label className="line" />
          <div className="sectionWrapper">
            <div className="row">
              <label className="titleProp">Enter XPNET amount</label>
              <label className="titleProp" style={{ opacity: "1" }}>
                Balance: {balance} {XPNET}
              </label>
            </div>
            <div className="row">
              <div className="amountInput">
                <input
                  type="text"
                  placeholder={`${amount} MIN staking requirement 1500 XPNET`}
                />
                <button className="maxBtn">MAX</button>
              </div>
              <label className="tokenLabel">
                <img src={xpnet} />
                {XPNET}
              </label>

              {/* <input
                type="text"
                className="amountInput"
                placeholder={`${amount} MIN staking requirement 1500 XPNET`}
              /> */}
            </div>
            <label className="titleProp">Select staking period</label>
            <div className={classNames("row", "wrapPeriods")}>
              <button
                value={3}
                className="periodBtn"
                style={{
                  background: `${
                    duration === 3
                      ? "rgba(255, 255, 255, 0.1)"
                      : "rgba(255, 255, 255, 0.03)"
                  }`,
                }}
                onClick={() => setDuration(3)}
              >
                3 months
                <span>APY 45%</span>
              </button>
              <button
                value={3}
                className="periodBtn"
                style={{
                  background: `${
                    duration === 6
                      ? "rgba(255, 255, 255, 0.1)"
                      : "rgba(255, 255, 255, 0.03)"
                  }`,
                }}
                onClick={() => setDuration(6)}
              >
                6 months
                <span>APY 75%</span>
              </button>
              <button
                value={3}
                className="periodBtn"
                style={{
                  background: `${
                    duration === 9
                      ? "rgba(255, 255, 255, 0.1)"
                      : "rgba(255, 255, 255, 0.03)"
                  }`,
                }}
                onClick={() => setDuration(9)}
              >
                9 months
                <span>APY 100%</span>
              </button>
              <button
                value={12}
                className="periodBtn"
                style={{
                  background: `${
                    duration === 12
                      ? "rgba(255, 255, 255, 0.1)"
                      : "rgba(255, 255, 255, 0.03)"
                  }`,
                }}
                onClick={() => setDuration(12)}
              >
                1 year
                <span>APY 125%</span>
              </button>
            </div>
            <div className="containerNft">
              <img src={nft} />
              <div>
                <label>
                  Don’t wait for 3 months - get a free NFT right NOW
                </label>
                <p>
                  A unique chain-agnostic NFT that serves as the access key to
                  staking rewards.
                </p>
                <Link to="/" className="linkNft">
                  View NFT collection
                </Link>
              </div>
            </div>
            <div className="warningDiv">
              <img src={info} />
              <div className="column">
                <label>Don’t sell your XPNET NFT</label>
                <p>
                  If you sell this NFT, you’ll lose the right to claim the XPNET
                  rewards, though you’ll still be able to withdraw the staking
                  deposit once it matures.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className={classNames("containerRight", "container")}>
          <h1>Summary</h1>
          <label className="line" />
          <div className={classNames("sectionWrapper", "summaryBox")}>
            <div className="periods">
              <div
                id="row1"
                className={classNames("row")}
                style={{ alignItems: "flex-end" }}
              >
                <label className="prop">Staking Amount</label>
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
                className={classNames("row", "borderBottom", "mt-7")}
              >
                <label className="prop">Est. APY</label>
                <label className="value">{APY[3]} %</label>
              </div>
              <div id="row3" className="row" style={{ alignItems: "flex-end" }}>
                <label className="prop">Estimated Rewards</label>
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
                className={classNames("row", "borderBottom", "mt-7")}
              >
                <label className="prop">End Date</label>
                <label className="value">{APY[3]} %</label>
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
                <span>XPNET Staking Service Agreement</span>
              </p>
            </div>
            <div className="column">
              <button className="blueBtn">Approve</button>
              <button className={classNames("blueBtn", "blackBtn")}>
                <img src={lock} />
                Lock
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
