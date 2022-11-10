import React, { FC } from "react";
import { Link } from "react-router-dom";
import "./activeAccountNavbar.scss";
import Jazzicon from "react-jazzicon";
// import { Menu, MenuItem, MenuButton, SubMenu } from "@szhsin/react-menu";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";



export const ActiveAccountNavbar: FC<{}> = () => {
    const title="bsc";
  const account = "0xe8a049E1CC432bC2eb57331d2cC51e9E2898E0e0";



  const handleSelect = (e: any) => {
    // setValue(e);
  };

//   let title = <div className="nameWrapper typeBtnWidth">{chain} <div className="arrow-down"></div></div>;


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
        <label className="account">
          {/* <Jazzicon diameter={16} address={`${account}`} /> */}
          {account.slice(0, 10) + "..." + account.slice(-2)}
        </label>
        <DropdownButton
            onSelect={handleSelect}
            id="dropdown-basic-button"
            title={title}
            size="sm"
            variant=""
          >
            <Dropdown.Item eventKey="Show All">Show All</Dropdown.Item>
            <Dropdown.Item eventKey="Transfer">Transfer</Dropdown.Item>
            <Dropdown.Item eventKey="Unfreeze">Unfreeze</Dropdown.Item>
          </DropdownButton>
      </div>
    </div>
  );
};
