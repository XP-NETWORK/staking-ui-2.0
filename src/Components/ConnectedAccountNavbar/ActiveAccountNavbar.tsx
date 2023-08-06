import React, { FC } from "react";

import "./activeAccountNavbar.scss";

import AccountChainNav from "../AccountChainNav/AccountChainNav";

export const ActiveAccountNavbar: FC<{}> = () => {
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
