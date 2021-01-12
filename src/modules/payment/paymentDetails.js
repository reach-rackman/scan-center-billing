import DateFnsUtils from "@date-io/date-fns";
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
    Button,
    FormControl,
    FormLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
    withStyles
} from "@material-ui/core";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import LockIcon from '@material-ui/icons/Lock';
import { inject, observer } from "mobx-react";
import * as constants from '../common/constants';
import ErrorMsg from '../common/ErrorMsg';

const styles = () => ({
    wrapper: {
        width: '30%',
        marginTop: 30
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        '& > *': {
            margin: '5px 0'
        }
    },
    formControl: {
        display: 'flex',
        flexDirection: 'row',
        margin: '3px 0',
        paddingBottom: 20,
        '& .fieldName': {
            minWidth: 125,
            maxWidth: 125,
            marginRight: 10,
            display: 'flex',
            alignItems: 'center',
            fontSize: 14,
            fontWeight: 600
        }
    },
    cardField: {
        width: '100%'
    },
    expiryDetails: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 10
    },
    encryption: {
        '& > *': {
            display: 'inline',
            verticalAlign: 'middle'
        }
    }
})

function PaymentDetails({ classes, payment, payments, patient, patientDetails }) {
    const history = useHistory();
    const [isFinal, setFinal] = useState(false);
    const [balanceAmt, setBalanceAmt] = useState(0);
    const [payableAmt, setPayableAmt] = useState(0);
    const [payableError, setPayableError] = useState();

    useEffect(() => {
        if (patient.id) {
            payments.fetch(patient.id);
        }
        setFinal(payments.items.length >= 2);
        setPayableAmt(patient.totalAmount - payments.amountPaid)
        setBalanceAmt(patient.totalAmount - payments.amountPaid)
    }, [payments.filterId, patient]);

    useEffect(() => {
        if (payment.paymentSuccessful && patient.id) {
            payments.fetch(patient.id);
        }
    }, [payment.paymentSuccessful]);
    
    useEffect(() => {
        if (payment.paymentSuccessful && payments.paymentsFetched) {
            if (payments.amountPaid && patient.totalAmount) {
                if (payments.amountPaid === patient.totalAmount) {
                    patientDetails.updatePaymentStatus(patient.id, constants.BILL_STATUS.FULLY_PAID.id, payments.amountPaid);
                    history.push('/patients')
                } else {
                    patientDetails.updatePaymentStatus(patient.id, constants.BILL_STATUS.DUE_BILLED.id, payments.amountPaid);
                }
            }
        }
    }, [payment.paymentSuccessful, payments.paymentsFetched, payments.items]);

    const handlePayment = () => {
        payment.set({paidAmount: parseInt(payableAmt)});
        payment.makePayment(patient.id);
    }

    const handlePayable = (value) => {
        setPayableAmt(value)
        setPayableError(value < (balanceAmt * 20/100) || value > balanceAmt);
    }

    return (
        <div className={classes.wrapper}>
            <form name="paymentDetailsForm" className={classes.form}>
                <FormControl className={classes.formControl}>
                    <FormLabel className="fieldName">Payable Amount</FormLabel>
                    <TextField
                        variant="outlined"
                        type="number"
                        inputProps={{
                            size: 10,
                            min: Math.round(balanceAmt*20/100),
                            max: balanceAmt,
                            step: 1
                        }}
                        disabled={isFinal}
                        value={payableAmt}
                        onChange={e => handlePayable(e.target.value)}
                    />
                    {payableError && (
                        <ErrorMsg msg="Min: 20%; Max: Total balance" />
                    )}
                </FormControl>
                <FormControl className={classes.formControl}>
                    <FormLabel className="fieldName">Payment Mode</FormLabel>
                    <Select
                        value={payment.mode}
                        inputProps={{size: 10}}
                        onChange={e => payment.onChange('mode', e.target.value)}
                    >
                        <MenuItem value={constants.CASH_PAYMENT}>{constants.CASH_PAYMENT}</MenuItem>
                        <MenuItem value={constants.CARD_PAYMENT}>{constants.CARD_PAYMENT}</MenuItem>
                    </Select>
                </FormControl>
                {payment.mode === constants.CARD_PAYMENT && (
                    <>
                        <FormControl className={classes.formControl}>
                            <TextField
                                label="Card Number"
                                variant="outlined"
                                className={classes.cardField}
                            />
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <TextField
                                label="Card holder's name"
                                variant="outlined"
                                className={classes.cardField}
                            />
                        </FormControl>
                        <FormLabel className="fieldName">Expiry</FormLabel>
                        <div className={classes.expiryDetails}>
                            <FormControl className={classes.formControl}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <DatePicker
                                        autoOk
                                        disablePast
                                        inputVariant="outlined"
                                        inputProps={{
                                            size: 4
                                        }}
                                        openTo="year"
                                        format="MMyyyy"
                                        views={["year", "month"]}
                                        label="Expiry Date"
                                    />
                                </MuiPickersUtilsProvider>
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <TextField
                                    label="CVV"
                                    variant="outlined"
                                    inputProps={{
                                        size: 3,
                                        maxLength: 3
                                    }}
                                />
                            </FormControl>
                            <div className={classes.encryption}>
                                <LockIcon fontSize="small"/>
                                <Typography variant="body2">128-bit secured</Typography>
                            </div>
                        </div>
                    </>
                )}
                <Button
                    variant="outlined"
                    color="primary"
                    disabled={payment.saveInProgress || payableError}
                    onClick={handlePayment}
                >Save</Button>
            </form>
        </div>
    )
}

export default withStyles(styles)(inject(
    'payment',
    'payments',
    'patientDetails'
)(observer(PaymentDetails)));