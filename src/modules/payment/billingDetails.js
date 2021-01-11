import { Table, TableBody, TableCell, TableRow, Typography, withStyles } from "@material-ui/core"
import { inject, observer } from "mobx-react";
import { useEffect } from "react";

const styles = () => ({
    wrapper: {
        width: '30%'
    },
    table: {
        '& .MuiTableCell-root': {
            padding: 0,
            borderBottomWidth: 2
        }
    }
});

function BillingDetails({ classes, patient, payments }) {
    useEffect(() => {
        if (patient.id) {
            payments.fetch(patient.id);
        }
    }, [patient]);

    return (
        <div className={classes.wrapper}>
            <Typography>Current Billing Status:</Typography>
            <Table className={classes.table}>
                <TableBody>
                    <TableRow>
                        <TableCell>Patient Name</TableCell>
                        <TableCell>{patient?.salutation} {patient?.patientName}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Patient Id</TableCell>
                        <TableCell>{patient?.id}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Age/Gender</TableCell>
                        <TableCell>{patient?.age}{patient?.ageType?.charAt(0)}/{patient?.gender}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Total Amount</TableCell>
                        <TableCell>{patient?.totalAmount} (inclusive of discounts)</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Discount</TableCell>
                        <TableCell>{patient?.totalDiscount}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Amount Paid</TableCell>
                        <TableCell>{payments.amountPaid}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Balance</TableCell>
                        <TableCell>{(patient.totalAmount - payments.amountPaid) | 0}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    )
}

export default withStyles(styles)(inject(
    'payments',
)(observer(BillingDetails)));