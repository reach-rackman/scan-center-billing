import { Table, TableHead, TableBody, TableCell, TableRow, withStyles } from "@material-ui/core";
import { useEffect } from "react";
import { inject, observer } from 'mobx-react';
import { Link } from "react-router-dom";

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

function SearchResultsTable({ classes, patients }) {
    useEffect(() => {
        if (patients) {
            patients.fetch();
        }
    }, [patients]);

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
                {patients.items.map((patient, index) => (
                    <TableRow>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{`${patient.salutation} ${patient.patientName}`}</TableCell>
                        <TableCell>{patient.age}-{patient.gender}</TableCell>
                        <TableCell>{patient.appointmentDate}</TableCell>
                        <TableCell>{patient.totalAmount}</TableCell>
                        <TableCell><Link to={`/patients/${patient.id}/payment`}>Click to Pay</Link></TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

export default withStyles(styles)(inject(
    'patients'
)(observer(SearchResultsTable)));