import React, { FC } from "react";
import pop from "../../assets/images/coin/pop.svg";
import algo from "../../assets/images/coin/algo1.svg";
import walletConnect from "../../assets/images/wallets/walletconnect.png";

import "./stakingLimitPopup.scss";
import { useNavigate } from "react-router";

interface Props {}

export const StakingLimitPopup: FC<Props> = ({}) => {
  const navigate = useNavigate();

  const handleChangeWallet = () => {};
  const handleStake = () => {};
  return (
    <>
      <div className="limitWraper">
        <img src={pop} alt="chains" />
        <h4>50M Staking Limit is reached!</h4>
        <p>
          Good news that more tokens are coming on BSC. Subscribe to get
          notified.
        </p>
        <div className="btns">
          <button className="stakeBtn" onClick={handleStake}>
            Notify me
          </button>
          <button className="changeWalletBtn" onClick={handleChangeWallet}>
            Claim XPNET
          </button>
        </div>
        <button className="algoBtnPop">
          <img src={algo} alt="algo" />
          Stake XPNET on Algorand now!
        </button>
      </div>
    </>
  );
};
