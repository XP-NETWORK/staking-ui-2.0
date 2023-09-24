import React, { FC } from "react";
import { useSelector } from "react-redux";

import { IFetchedStake } from "../../assets/ts/Consts";

import { ReduxState } from "../../store/store";
import "./stakinghistory.scss";
import { TableRow } from "./TableRow";

interface Props {}

export const StakingHistory: FC<Props> = () => {
    const { fetchedAlgoStakes } = useSelector(
        (state: ReduxState) => state.homePage
    );

    return (
        <div
            style={{ display: fetchedAlgoStakes ? "auto" : "none" }}
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
                    <tbody>
                        {fetchedAlgoStakes.map(
                            (stake: IFetchedStake, index: number) => {
                                return (
                                    <TableRow
                                        stake={stake}
                                        cell={index}
                                        key={`${index} txId: ${stake.txId}`}
                                    />
                                );
                            }
                        )}
                    </tbody>
                </table>
            </div>
        </div>
        // )
    );
};
