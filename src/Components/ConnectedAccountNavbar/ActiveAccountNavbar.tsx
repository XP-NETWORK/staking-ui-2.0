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
import { useDispatch } from "react-redux";
import { setLimitModal } from "../../store/reducer/homePageSlice";

export const ActiveAccountNavbar: FC<{}> = () => {
    const chain = BLOCKCHAINS[0];

    const { blockchain, evmStakes, balance } = useSelector(
        (state: ReduxState) => state.homePage
    );
    const dispatch = useDispatch();

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
            {/* {blockchain.chain !== "BSC" ? (
                <Link
                    style={claimLinkStyle}
                    to={"/stake"}
                    className={`activeNavLink ${
                        route === "/stake" ? "active-link" : ""
                    }`}
                >
                    Stake XPNET
                </Link>
            ) : (
                <div
                    style={{ cursor: "pointer" }}
                    onClick={() => dispatch(setLimitModal(true))}
                    className={`activeNavLink ${
                        route === "/stake" ? "active-link" : ""
                    }`}
                >
                    Stake XPNET
                </div>
            )}
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
            </Link> */}
            <AccountChainNav />
        </div>
    );
};
