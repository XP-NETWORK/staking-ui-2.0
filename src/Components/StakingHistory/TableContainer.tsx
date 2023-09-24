import React, { FC } from "react";

import Table from "react-bootstrap/Table";

interface Props {}

export const TableContainer: FC<Props> = () => {
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
            <tbody></tbody>
        </Table>
    );
};
