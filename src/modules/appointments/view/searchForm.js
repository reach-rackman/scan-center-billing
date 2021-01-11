import { useState } from 'react';
import {
    Button,
    FormControl,
    FormLabel,
    MenuItem,
    Select,
    TextField,
    withStyles
} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import * as constants from '../../common/constants';

const styles = () => ({
    wrapper: {
        marginTop: 20
    },
    form: {
        display: 'flex',
        justifyContent: 'space-evenly'
    },
    formControl: {
        display: 'flex',
        flexDirection: 'row',
        margin: '10px 0',
        justifyContent: 'center',
        '& .fieldName': {
            marginRight: 10,
            display: 'flex',
            alignItems: 'center',
            fontWeight: 600,
            fontSize: 14
        }
    }
})

function SearchForm({ classes, onSearch }) {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [paymentStatus, setPaymentStatus] = useState(constants.BILL_STATUS.NOT_YET_STARTED.id);
    const [searchString, setSearchString] = useState('');

    return (
        <div className={classes.wrapper}>
            <form name="searchAppointmentsForm" className={classes.form}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <FormControl className={classes.formControl}>
                        <FormLabel className="fieldName">From Date</FormLabel>
                        <DatePicker
                            autoOk
                            inputVariant="outlined"
                            openTo="year"
                            format="dd/MM/yyyy"
                            label="From Date"
                            views={["year", "month", "date"]}
                            value={startDate}
                            onChange={date => setStartDate(date.getTime())}
                        />
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <FormLabel className="fieldName">End Date</FormLabel>
                        <DatePicker
                            autoOk
                            inputVariant="outlined"
                            openTo="year"
                            format="dd/MM/yyyy"
                            label="End Date"
                            views={["year", "month", "date"]}
                            value={endDate}
                            onChange={date => setEndDate(date.getTime())}
                        />
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <FormLabel className="fieldName">Status</FormLabel>
                        <Select
                            variant="outlined"
                            value={paymentStatus}
                            onChange={e => setPaymentStatus(e.target.value)}
                        >
                            <MenuItem value={constants.BILL_STATUS.NOT_YET_STARTED.id}>{constants.BILL_STATUS.NOT_YET_STARTED.value}</MenuItem>
                            <MenuItem value={constants.BILL_STATUS.DUE_BILLED.id}>{constants.BILL_STATUS.DUE_BILLED.value}</MenuItem>
                            <MenuItem value={constants.BILL_STATUS.FULLY_PAID.id}>{constants.BILL_STATUS.FULLY_PAID.value}</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <FormLabel className="fieldName">Search</FormLabel>
                        <TextField
                            variant="outlined"
                            value={searchString}
                            onChange={e => setSearchString(e.target.value)}
                        />
                    </FormControl>
                </MuiPickersUtilsProvider>
                <FormControl className={classes.formControl}>
                    <Button
                        variant="outlined"
                        color="primary"
                        size="small"
                        onClick={() => {onSearch({startDate, endDate, paymentStatus, searchString})}}
                    >Search</Button>
                </FormControl>
            </form>
        </div>
    );
}

export default withStyles(styles)(SearchForm);