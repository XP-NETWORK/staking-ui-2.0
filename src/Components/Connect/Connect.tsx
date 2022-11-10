import React, { FC } from "react";
import wallet from "../../assets/images/wallet.svg";
import close from "../../assets/images/close-icon.svg";
import myAlgo from "../../assets/images/wallets/myalgo.svg";
import walletConnect from "../../assets/images/wallets/walletconnect.png";

import "./connect.scss";
import { useNavigate } from "react-router";

interface Props {}

export const Connect: FC<Props> = ({}) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="connectWraper">
        <div className="connectHeader">
          <label>
            <img src={wallet} />
            Connect a wallet
          </label>
          <img src={close} onClick={() => navigate("/")} />
        </div>
        <div className="connectBtns">
          <button>
            <img src={myAlgo} />
            MyAlgo
          </button>
          <button>
            <img src={walletConnect} />
            WalletConnect
          </button>
        </div>
        <p>
          By connecting a wallet, you agree to XPNET’s{" "}
          <span>Terms of Service</span> and acknowledge that you have read and
          understand the <span>XPNET protocol disclaimer</span>.
        </p>
      </div>
    </>
  );
};
