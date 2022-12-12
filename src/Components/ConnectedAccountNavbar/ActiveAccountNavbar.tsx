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

    const { blockchain, evmStakes, balance } = useSelector(
        (state: ReduxState) => state.homePage
    );
    // console.log(blockchain.chain);

    const [showDrop, setshowDrop] = useState(false);
    const route = window.location.pathname;

    const claimLinkStyle: React.CSSProperties = {
        pointerEvents:
            blockchain.chain === "Algorand" && !balance ? "none" : "auto",
    };

    let title = (
        <div className="ddItem">
            <img src={chain.img} alt={chain.img} />
            {chain.chain}
        </div>
    );

    return (
        <div className="activeWrapper">
            <Link
                style={claimLinkStyle}
                to={
                    blockchain.chain === "BSC" && evmStakes
                        ? "/limit"
                        : "/stake"
                }
                className={`activeNavLink ${
                    route === "/stake" ? "active-link" : ""
                }`}
            >
                Stake XPNET
            </Link>
            <Link
                style={claimLinkStyle}
                to={
                    blockchain.chain === "BSC" && !evmStakes
                        ? "error"
                        : "/rewards"
                }
                className={`activeNavLink ${
                    route === "/rewards" ? "active-link" : ""
                }`}
            >
                Claim XPNET
            </Link>
            <Link
                to="/gallery"
                className={`activeNavLink ${
                    route === "/gallery" ? "active-link" : ""
                }`}
            >
                NFT Collection
            </Link>
            <AccountChainNav />
        </div>
    );
};
