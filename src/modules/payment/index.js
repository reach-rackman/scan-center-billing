import { withStyles } from "@material-ui/core";
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

function Payment({ classes, patients, match }) {
    const patientId = match.params.patientId;
    const [patient, setPatient] = useState({});
    useEffect(() => {
        if (patients) {
            patients.getPatient(patientId).then((response) => setPatient(response));
        }
    }, [patients]);

    return (
        <div className={classes.wrapper}>
            <PageHeader pageName="Patient Billing" />
            <div className={classes.existingDetails}>
                <BillingDetails patient={patient} />
                <PreviousTransactions patientId={patient?.id} />
            </div>
            <PaymentDetails patientId={patient?.id} />
        </div>
    )
}

export default withRouter(withStyles(styles)(inject(
    'patients'
)(observer(Payment))));