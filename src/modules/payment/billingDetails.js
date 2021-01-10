import { Table, TableBody, TableCell, TableRow, Typography, withStyles } from "@material-ui/core"
import { inject, observer } from "mobx-react";
import { useEffect, useState } from "react";

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
    const [amountPaid, setAmountPaid] = useState(0);
    useEffect(() => {
        if (patient && patient.id) {
            payments.fetch(patient.id);
        }
    }, [patient]);

    useEffect(() => {
        if (payments.items.length) {
            let total = 0;
            payments.items.forEach(item => total = total + item.paidAmount);
            setAmountPaid(total);
        }
    }, [payments.items]);

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
                        <TableCell>{amountPaid}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Balance</TableCell>
                        <TableCell>{patient?.totalAmount - amountPaid}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    )
}

export default withStyles(styles)(inject(
    'payments',
)(observer(BillingDetails)));