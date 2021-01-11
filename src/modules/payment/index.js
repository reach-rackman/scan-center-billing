import { Snackbar, withStyles } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { inject, observer } from "mobx-react";
import { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import PageHeader from "../common/PageHeader";
import BillingDetails from "./billingDetails";
import PaymentDetails from './paymentDetails';
import PreviousTransactions from "./previousTransactions";

const styles = () => ({
    wrapper: {
        width: '100%'
    },
    existingDetails: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: 30
    }
})

function Payment({ classes, patients, payment, match }) {
    const patientId = match.params.patientId;
    const [patient, setPatient] = useState({});
    const [openSnackBar, setOpenSnackBar] = useState(false);
    useEffect(() => {
        if (patients) {
            patients.getPatient(patientId).then((patient) => setPatient(patient));
        }
    }, [patients]);

    useEffect(() => {
        payment.paymentSuccessful && setOpenSnackBar(payment.paymentSuccessful);
    }, [payment.paymentSuccessful]);

    const handleClose = () => {
        setOpenSnackBar(false);
    }

    return (
        <div className={classes.wrapper}>
            <PageHeader pageName="Patient Billing" />
            <div className={classes.existingDetails}>
                <BillingDetails patient={patient} />
                <PreviousTransactions patient={patient} />
            </div>
            <PaymentDetails patient={patient} />
            <Snackbar open={openSnackBar} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    Payment Successful!
                </Alert>
            </Snackbar>
        </div>
    )
}

export default withRouter(withStyles(styles)(inject(
    'patients',
    'payment'
)(observer(Payment))));