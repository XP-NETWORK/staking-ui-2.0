/* eslint-disable  */

import icon from "../../assets/wallets/WalletConnect.svg";
import { HigherEVM } from "./HigherEVM";
import { useAccount } from "wagmi";
import { useWeb3Modal } from "@web3modal/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
    setEvmAccount,
    setEvmStakes,
    setBlockchain,
} from "../../store/reducer/homePageSlice";

import { usePublicClient, useNetwork } from "wagmi";
import xpNetStaker from "./../../ABI/xpNetStaker.json";

import { BLOCKCHAINS, bsc_staking } from "../../assets/ts/Consts";

import { useNavigate } from "react-router";

const WalletConnect = () => {
    const dispatch = useDispatch();
    //@ts-ignore
    const navigate = useNavigate();
    //@ts-ignore
    const { address } = useAccount();

    const provider = usePublicClient();

    const { open } = useWeb3Modal();

    const handleClick = async () => {
        if (!address) await open();
        else dispatch(setEvmAccount(address));
    };

    const amountOfTokenByIndex = async (address: string) => {
        try {
            const stakes = await provider.readContract({
                address: bsc_staking,
                abi: xpNetStaker,
                functionName: "balanceOf",
                args: [address as any],
            });

            if (stakes && Number(stakes) > 0) {
                dispatch(setEvmStakes(stakes));
                dispatch(setBlockchain(BLOCKCHAINS[1]));
                navigate("/rewards");
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (address) {
            dispatch(setEvmAccount(address));
            amountOfTokenByIndex(address as string);
        }
    }, [address]);

    return (
        <button onClick={handleClick} className="connectBtn">
            <img style={{ width: "28px" }} src={icon} alt="" />
            WalletConnect
        </button>
    );
};

export default HigherEVM(WalletConnect);
