import React, { useState } from "react";
import { useSelector } from "react-redux";
import { BLOCKCHAINS } from "../../assets/ts/Consts";
import { ReduxState } from "../../store/store";
import "../ConnectedAccountNavbar/activeAccountNavbar.scss";

export default function AccountChainNav() {
  const chain = BLOCKCHAINS[0];
  const { account } = useSelector((state: ReduxState) => state.homePage);
  const [showDrop, setshowDrop] = useState(false);

  const handleChangeChain = (e: any) => {
    // setValue(e);
  };

  let title = (
    <div className="ddItem">
      <img src={chain.img} alt={chain.img} />
      {chain.chain}
    </div>
  );
  return (
    <div className="chainAndAccountContainer">
      <div className="dropWraper">
        <button onClick={() => setshowDrop(!showDrop)} className="dropdown">
          {title}
        </button>

        {showDrop && (
          <div className="item">
            {BLOCKCHAINS.filter((c) => c.chain !== chain.chain).map((c) => {
              return (
                <label id={c.chain} onClick={handleChangeChain}>
                  <img src={c.img} alt={c.chain} />
                  {c.chain}
                </label>
              );
            })}
          </div>
        )}
      </div>

      <label className="account">
        {/* <Jazzicon diameter={16} address={`${account}`} /> */}
        {account.slice(0, 10) + "..." + account.slice(-2)}
      </label>
    </div>
  );
}
