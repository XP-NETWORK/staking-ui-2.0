import React, { FC, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
    formatTheNumber,
    getAlgoStakeEndDate,
    getAPY,
    getMonths,
} from "../../assets/ts/algoUtils";
import { IAlgoRewards, IFetchedStake } from "../../assets/ts/Consts";
import { getStartDate } from "../../assets/ts/evmUtils";
import { ReduxState } from "../../store/store";
import CLAIMButton from "../Buttons/CLAIMButton";

interface Props {
    stake: IFetchedStake;
    cell: number;
}

export const TableRow: FC<Props> = ({ stake, cell }) => {
    const { algoRewards, account, signer, fetchedAlgoStakes } = useSelector(
        (state: ReduxState) => state.homePage
    );
    const selectedStakeRewards: IAlgoRewards | undefined = algoRewards.find(
        (rewards: IAlgoRewards) => rewards.appid === stake?.appId
    );

    const startDate = getStartDate(stake.stakingTime.toString()).slice(0, 10);
    const endDate = getAlgoStakeEndDate(
        stake.lockTime.toString(),
        stake.timeToUnlock.toString()
    ).slice(0, 10);
    const month = getMonths(stake.lockTime);
    const stakeAmount = formatTheNumber(stake.tokensStaked / 1e6);
    const apy = getAPY(selectedStakeRewards);
    const responsive = window.innerWidth < 600;

    return (
        <tr
            className={
                cell % 2 ? "table-history-row" : "table-history-row row--gray"
            }
        >
            <td>
                {responsive && <strong>Start Date: </strong>}
                {startDate}
            </td>
            <td>
                {responsive && <strong>End Date: </strong>}
                {endDate}
            </td>
            <td>
                {responsive && <strong>Duration: </strong>}
                {month} months
            </td>
            <td>
                {responsive && <strong>Staking Amount: </strong>}
                {stakeAmount}
            </td>
            <td>
                {responsive && <strong>APY: </strong>}
                {apy}%
            </td>
            <td>
                <CLAIMButton
                    signer={signer}
                    account={account}
                    stakes={fetchedAlgoStakes}
                    index={cell}
                    cell={true}
                />
            </td>
        </tr>
    );
};
