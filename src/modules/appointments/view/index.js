import { Typography, withStyles } from '@material-ui/core';
import PageHeader from '../../common/PageHeader';
import SearchForm from './searchForm';
import SearchResultsTable from './searchResultsTable';

const styles = {
    wrapper: {
        width: '100%'
    }
};

function ViewAppointments({ classes }) {
    return (
        <div className={classes.wrapper}>
            <PageHeader pageName="View Appointments" />
            <SearchForm />
            <SearchResultsTable />
        </div>
    )
};

export default withStyles(styles)(ViewAppointments);