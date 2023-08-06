import React, { FC, useRef } from "react";
import { Link } from "react-router-dom";
import "./navbarMobActive.scss";
import { ReduxState } from "../../store/store";
import { useSelector, useDispatch } from "react-redux";
import { setLimitModal } from "../../store/reducer/homePageSlice";
import { useOnClickOutside } from "../../assets/ts/helpers";

interface Props {
    setOpen: Function;
}

export const NavbarMobActive: FC<Props> = ({ setOpen }) => {
    const { account, blockchain, balance, evmStakes } = useSelector(
        (state: ReduxState) => state.homePage
    );

    const dispatch = useDispatch();
    const ref = useRef(null);
    useOnClickOutside(ref, () => setOpen(false));
    const route = window.location.pathname;

    const claimLinkStyle: React.CSSProperties = {
        pointerEvents:
            blockchain.chain === "Algorand" && !balance ? "none" : "auto",
        cursor: "pointer",
    };

    return (
        <>
            <div ref={ref} className="navmobile">
                {/* {account && (
                    <div className="activeWrapperMob">
                        <Link to="/stake" className="activeNavLink">
                            Stake XPNET
                        </Link>
                        <Link to="/rewards" className="activeNavLink">
                            Claim XPNET
                        </Link>
                        <Link to="/gallery" className="activeNavLink">
                            NFT Collection
                        </Link>
                    </div>
                )} */}
                {/* {account && blockchain.chain !== "BSC" ? (
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
                        onClick={() =>
                            blockchain.chain !== "BSC"
                                ? dispatch(setLimitModal(true))
                                : null
                        }
                        className={`activeNavLink ${
                            route === "/stake" ? "active-link" : ""
                        }`}
                    >
                        Stake XPNET
                    </div>
                )} */}
                <label className="line" />
                <div className="activeWrapperMob">
                    {account && (
                        <>
                            <Link
                                onClick={() =>
                                    blockchain.chain !== "BSC"
                                        ? dispatch(setLimitModal(true))
                                        : null
                                }
                                style={claimLinkStyle}
                                to={"/stake"}
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
                        </>
                    )}
                    <Link className="nav-link" to="/">
                        Home
                    </Link>
                    <a
                        href="https://xp.network/"
                        target="_blank"
                        rel="noreferrer"
                        className="nav-link"
                    >
                        XP.NETWORK
                    </a>
                    <a
                        href="https://token.bridge.xp.network"
                        className="nav-link"
                        target="_blank"
                        rel="noreferrer"
                    >
                        XPNET Bridge
                    </a>
                    <Link
                        to="/gallery"
                        className={`nav-link ${
                            route === "/gallery" ? "active-link" : ""
                        }`}
                    >
                        NFT Collection
                    </Link>
                </div>

                {/* <label className="line" /> */}
                {/* <div className="navMediaWrapperMob">
                    <a
                        href="https://il.linkedin.com/company/xpnetwork"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <img src={linkedin} alt="linkedin" />
                    </a>
                    <a
                        href="https://t.me/xp_network"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <img src={telegram} alt="telegram" />
                    </a>
                    <a
                        href="https://twitter.com/xpnetwork_"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <img src={twitter} alt="twitter" />
                    </a>
                    <a
                        href="https://www.reddit.com/r/XP_network/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <img src={redit} alt="redit" />
                    </a>
                </div> */}
            </div>
        </>
    );
};
