import DateFnsUtils from "@date-io/date-fns";
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

function PaymentDetails({ classes, payment, payments, patientId }) {
    useEffect(() => {
        if (patientId) {
            payments.fetch(patientId);
        }
    }, [patientId]);

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
                            min: 50
                        }}
                        value={payment.paidAmount}
                        onChange={e => payment.onChange('paidAmount', parseInt(e.target.value))}
                    />
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
                    disabled={payment.saveInProgress}
                    onClick={() => payment.makePayment(patientId)}
                >Save</Button>
            </form>
        </div>
    )
}

export default withStyles(styles)(inject(
    'payment',
    'payments'
)(observer(PaymentDetails)));