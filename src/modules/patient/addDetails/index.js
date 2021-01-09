import { withStyles } from '@material-ui/core';
import PageHeader from '../../common/PageHeader';
import MedicalScanDetails from './medicalScanDetails';
import PatientForm from './patientForm';
import PatientDetails from './model/PatientDetails';
import StoreRegistry from '../../common/storeRegistry';
import * as constants from '../../common/constants';
import ScanList from '../../common/models/MedicalBillingMaster';

const styles = () => ({
    wrapper: {
        width: '100%'
    }
});

function AddPatientDetails({ classes }) {
    return (
        <div className={classes.wrapper}>
            <PageHeader pageName="Patient Details" />
            <PatientForm />
            <MedicalScanDetails />
        </div>
    )
}

export default withStyles(styles)(AddPatientDetails);