import { Typography, withStyles } from '@material-ui/core';
import { inject, observer } from 'mobx-react';
import { useEffect, useState } from 'react';
import PageHeader from '../../common/PageHeader';
import SearchForm from './searchForm';
import SearchResultsTable from './searchResultsTable';
import * as constants from '../../common/constants';

const styles = {
    wrapper: {
        width: '100%'
    }
};

function ViewAppointments({ classes, patients }) {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        patients.fetch({paymentStatus: constants.BILL_STATUS.NOT_YET_STARTED.id});
    }, []);

    const handleSearch = (searchCriteria) => {
        patients.fetch(searchCriteria);
    }

    useEffect(() => {
        setAppointments(patients.items);
    }, [patients.items]);

    return (
        <div className={classes.wrapper}>
            <PageHeader pageName="View Appointments" />
            <SearchForm onSearch={handleSearch} />
            <SearchResultsTable appointments={appointments} />
        </div>
    )
};

export default withStyles(styles)(inject('patients')(observer(ViewAppointments)));