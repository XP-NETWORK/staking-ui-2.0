import React, { FC, useState } from "react";
import { Link } from "react-router-dom";
import "./activeAccountNavbar.scss";
import Jazzicon from "react-jazzicon";
// import { Menu, MenuItem, MenuButton, SubMenu } from "@szhsin/react-menu";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import { BLOCKCHAINS } from "../../assets/ts/Consts";
import classNames from "classnames";
import { useSelector } from "react-redux";
import { ReduxState } from "../../store/store";
import AccountChainNav from "../AccountChainNav/AccountChainNav";

export const ActiveAccountNavbar: FC<{}> = () => {
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
    <div className="activeWrapper">
      <Link to="/stake" className="activeNavLink">
        Stake XPNET
      </Link>
      <Link to="/rewards" className="activeNavLink">
        Claim XPNET
      </Link>
      <Link to="/gallery" className="activeNavLink">
        NFT Collection
      </Link>
      <AccountChainNav />
      {/* <div className="chainAndAccountContainer">
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
           <Jazzicon diameter={16} address={`${account}`} />
          {account.slice(0, 10) + "..." + account.slice(-2)}
        </label>
      </div> */}
    </div>
  );
};
