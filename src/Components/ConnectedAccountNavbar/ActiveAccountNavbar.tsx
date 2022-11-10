import React, { FC } from "react";
import { Link } from "react-router-dom";
import "./activeAccountNavbar.scss";
import Jazzicon from "react-jazzicon";
// import { Menu, MenuItem, MenuButton, SubMenu } from "@szhsin/react-menu";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import { BLOCKCHAINS } from "../../assets/ts/Consts";
import classNames from "classnames";

export const ActiveAccountNavbar: FC<{}> = () => {
  const chain = BLOCKCHAINS[0];
  const account = "0xe8a049E1CC432bC2eb57331d2cC51e9E2898E0e0";

  const handleSelect = (e: any) => {
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
      <div className="chainAndAccountContainer">
        <DropdownButton
          onSelect={handleSelect}
          id="dropdown-basic-button"
          title={title}
          size="sm"
          variant=""
          className="dropdown"
        >
          {BLOCKCHAINS.filter((c) => c.chain !== chain.chain).map((c) => {
            return (
              <Dropdown.Item eventKey={c.chain}>
                <label>
                  <img src={c.img} alt={c.chain} />
                  {c.chain}
                </label>
              </Dropdown.Item>
            );
          })}
        </DropdownButton>
        <label className="account">
          {/* <Jazzicon diameter={16} address={`${account}`} /> */}
          {account.slice(0, 10) + "..." + account.slice(-2)}
        </label>
      </div>
    </div>
  );
};
