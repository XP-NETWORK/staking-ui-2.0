import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

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
        if (evmAccount) {
            const evmBalance = async () => {
                const balance = await getEvmXpNetBalance(evmAccount);
                dispatch(setEvmBalance(balance));
            };
            const stakesOfOwnerByIndex = async (stakes: number) => {
                const stakesTokens = await getTokenOfOwnerByIndex(
                    stakes,
                    evmAccount
                );

                dispatch(setEVMStakesArray(stakesTokens));
            };

            evmBalance();
            if (evmStakes) {
                stakesOfOwnerByIndex(evmStakes);
            }
        }
    }, [evmAccount]);

    return <div></div>;
}
