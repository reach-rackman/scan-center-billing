import { withStyles } from '@material-ui/core';
import PageHeader from '../../common/PageHeader';
import PatientForm from './patientForm';

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
        </div>
    )
}

export default withStyles(styles)(AddPatientDetails);