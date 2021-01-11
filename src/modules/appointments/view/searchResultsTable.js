import { Table, TableHead, TableBody, TableCell, TableRow, withStyles, Typography } from "@material-ui/core";
import { useEffect } from "react";
import { inject, observer } from 'mobx-react';
import { Link } from "react-router-dom";
import * as constants from '../../common/constants';

const styles = (theme) => ({
    table: {
        marginTop: 30
    },
    tableHead: {
        backgroundColor: theme.palette.primary.main,
    },
    tableCell: {
        color: theme.palette.secondary.main
    },
});

function SearchResultsTable({ classes, appointments }) {
    return (
        <Table className={classes.table}>
            <TableHead className={classes.tableHead}>
                <TableRow>
                    <TableCell className={classes.tableCell}>S. no</TableCell>
                    <TableCell className={classes.tableCell}>Patient Name</TableCell>
                    <TableCell className={classes.tableCell}>Age-Gender</TableCell>
                    <TableCell className={classes.tableCell}>Appointment Date</TableCell>
                    <TableCell className={classes.tableCell}>Balance Amount</TableCell>
                    <TableCell className={classes.tableCell}>Action</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {appointments.map((patient, index) => (
                    <TableRow>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{`${patient.salutation} ${patient.patientName}`}</TableCell>
                        <TableCell>{patient.age}-{patient.gender}</TableCell>
                        <TableCell>{new Date(patient.appointmentDate).toDateString()}</TableCell>
                        <TableCell>{patient.totalAmount}</TableCell>
                        <TableCell>
                            {patient.paymentStatus === constants.BILL_STATUS.FULLY_PAID.id && (
                                <Typography>{constants.BILL_STATUS.FULLY_PAID.value}</Typography>
                            )}
                            {patient.paymentStatus !== constants.BILL_STATUS.FULLY_PAID.id && (
                                <Link to={`/patients/${patient.id}/payment`}>Click to Pay</Link>
                            )}
                        </TableCell>
                    </TableRow>
                ))}
                {!appointments.length && (
                    <TableRow>
                        <TableCell colSpan="6">No records to show</TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}

export default withStyles(styles)(observer(SearchResultsTable));