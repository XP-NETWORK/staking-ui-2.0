import React, { FC, useEffect, useRef, useState } from "react";
import { IFetchedStake } from "../../assets/ts/Consts";
import Table from "react-bootstrap/Table";
import { TableRow } from "./TableRow";
import { useSelector } from "react-redux";
import { ReduxState } from "../../store/store";

interface Props {}

export const TableContainer: FC<Props> = ({}) => {
    const { fetchedAlgoStakes } = useSelector(
        (state: ReduxState) => state.homePage
    );
    return (
        <Table striped bordered hover variant="dark">
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
                {fetchedAlgoStakes?.map((stake: IFetchedStake) => (
                    <TableRow stake={stake} />
                ))}
            </tbody>
        </Table>
    );
};
