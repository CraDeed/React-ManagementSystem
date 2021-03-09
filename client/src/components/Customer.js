import React from "react";
import CustomerDelete from "./CustomerDelete";

import { TableRow, TableCell } from "@material-ui/core";

function Customer({ stateRefresh, id, image, name, birthday, gender, job }) {
    return (
        <TableRow>
            <TableCell>{id}</TableCell>
            <TableCell>
                <img src={image} alt="profile" style={{ width: "64px" }} />
            </TableCell>
            <TableCell>{name}</TableCell>
            <TableCell>{birthday}</TableCell>
            <TableCell>{gender}</TableCell>
            <TableCell>{job}</TableCell>
            <TableCell>
                <CustomerDelete stateRefresh={stateRefresh} id={id} />
            </TableCell>
        </TableRow>
    );
}

export default Customer;
