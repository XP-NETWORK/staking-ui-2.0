import React, { FC, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { getAlgoStakeEndDate } from "../../assets/ts/algoUtils";
import { IFetchedStake } from "../../assets/ts/Consts";
import { getStartDate } from "../../assets/ts/evmUtils";
import { ReduxState } from "../../store/store";
import "./stakinghistory.scss";
import { TableRow } from "./TableRow";

interface Props {}

export const StakingHistory: FC<Props> = ({}) => {
    const { fetchedAlgoStakes } = useSelector(
        (state: ReduxState) => state.homePage
    );

    useEffect(() => {}, [fetchedAlgoStakes]);

    return (
        fetchedAlgoStakes && (
            <div
                // style={{ display: fetchedAlgoStakes.length ? "auto" : "none" }}
                className="staking-history__container"
            >
                <div className="history-header">Staking History</div>
                <div className="staking-history-line"></div>
                <div className="history-table__container">
                    <table className="history-table">
                        <thead>
                            <tr>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Duration</th>
                                <th>Staking amount (XPNET)</th>
                                <th>APY</th>
                                <th></th>
                            </tr>
                        </thead>
                        {fetchedAlgoStakes.map(
                            (stake: IFetchedStake, index: number) => {
                                // console.log({ index });
                                return (
                                    <TableRow
                                        stake={stake}
                                        cell={index}
                                        key={stake.id}
                                    />
                                );
                            }
                        )}
                    </table>
                </div>
            </div>
        )
    );
};
