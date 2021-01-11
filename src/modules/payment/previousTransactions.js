import { useEffect } from "react";
import { inject, observer } from "mobx-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    withStyles
} from "@material-ui/core";

const styles = (theme) => ({
    wrapper: {
        width: '50%'
    },
    tableHead: {
        backgroundColor: theme.palette.primary.main
    },
    tableCell: {
        color: theme.palette.secondary.main
    }
});

function PreviousTransactions({ classes, payments, patient }) {

    useEffect(() => {
        if (patient.id) {
            payments.fetch(patient.id);
        }
    }, [patient]);

    return (
        <div className={classes.wrapper}>
            <Table>
                <TableHead className={classes.tableHead}>
                    <TableRow>
                        <TableCell className={classes.tableCell}>S No.</TableCell>
                        <TableCell className={classes.tableCell}>Date</TableCell>
                        <TableCell className={classes.tableCell}>Paid Amount</TableCell>
                        <TableCell className={classes.tableCell}>Mode</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {payments.items.map((item, index) => (
                        <TableRow>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{item.paymentDate}</TableCell>
                            <TableCell>{item.paidAmount}</TableCell>
                            <TableCell>{item.mode}</TableCell>
                        </TableRow>
                    ))}
                    {!payments.items.length && (
                        <TableRow>
                            <TableCell colSpan="6">No payments so far</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

        </div>
    )
}

export default withStyles(styles)(inject(
    'payments'
)(observer(PreviousTransactions)));