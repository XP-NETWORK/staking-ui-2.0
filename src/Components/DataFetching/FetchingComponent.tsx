import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useAccount, usePublicClient } from "wagmi";
import {
    getEvmXpNetBalance,
    getTokenOfOwnerByIndex,
} from "../../assets/ts/evmUtils";
import {
    setEvmBalance,
    setEVMStakesArray,
} from "../../store/reducer/homePageSlice";
import { ReduxState } from "../../store/store";

export default function FetchingComponent() {
    const dispatch = useDispatch();

    const { evmAccount, evmStakes } = useSelector(
        (state: ReduxState) => state.homePage
    );
    //@ts-ignore
    const { address } = useAccount();
    const walletConnect = usePublicClient();

    useEffect(() => {
        const account = evmAccount || address;
        const wcProvider = address ? walletConnect : undefined;
        if (account) {
            const evmBalance = async () => {
                const balance = await getEvmXpNetBalance(
                    account as any,
                    wcProvider
                );
                dispatch(setEvmBalance(balance));
            };

            const stakesOfOwnerByIndex = async (stakes: number) => {
                const stakesTokens = await getTokenOfOwnerByIndex(
                    stakes,
                    account,
                    wcProvider
                );

                dispatch(setEVMStakesArray(stakesTokens));
            };

            evmBalance();

            if (evmStakes) {
                stakesOfOwnerByIndex(evmStakes);
            }
        }
    }, [evmAccount, address, evmStakes]);

    return <div></div>;
}
