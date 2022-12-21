import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getXpNetBalance } from "../../assets/ts/algoUtils";
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

    useEffect(() => {
        const evmBalance = async () => {
            const balance = await getEvmXpNetBalance(evmAccount);
            dispatch(setEvmBalance(balance));
        };
        const stakesOfOwnerByIndex = async (stakes: number) => {
            const stakesTokens = await getTokenOfOwnerByIndex(
                stakes,
                "0xa796A5a95a1dDEF1d557d38DF9Fe86dc2b204D63"
            );
            dispatch(setEVMStakesArray(stakesTokens));
        };
        if (evmAccount) {
            evmBalance();
            if (evmStakes) {
                stakesOfOwnerByIndex(evmStakes);
            }
        }
    }, [evmAccount]);

    return <div></div>;
}
