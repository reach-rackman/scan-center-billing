import { Button, Typography, withStyles } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import PageHeader from '../common/PageHeader';
import * as constants from '../common/constants';

const styles = () => ({
    homeWrapper: {
        width: '100%'
    },
    actionsWrapper: {
        width: '100%',
        marginTop: 30,
        display: 'flex',
        justifyContent: 'space-evenly'
    }
});

function Home({ classes }) {
    const history = useHistory();
    const handleAddPatient = () => {
        history.push(constants.ADD_PATIENT);
    };

    const handleBilling = () => {
        history.push(constants.BILLING);
    }
    return (
        <div className={classes.homeWrapper}>
            <PageHeader pageName="Home"/>
            <div className={classes.actionsWrapper}>
                <Button variant="contained" color="primary" onClick={handleAddPatient}>
                    <Typography variant="body2" color="secondary">Add Patient</Typography>
                </Button>
                <Button variant="contained" color="primary" onClick={handleBilling}>
                    <Typography variant="body2" color="secondary">Billing</Typography>
                </Button>
            </div>
        </div>
    );
}

export default withStyles(styles)(Home);
