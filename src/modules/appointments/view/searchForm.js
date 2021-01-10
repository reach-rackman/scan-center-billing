import { Button, FormControl, FormLabel, MenuItem, Select, TextField, withStyles } from '@material-ui/core';
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
        '& .fieldName': {
            marginRight: 10,
            display: 'flex',
            alignItems: 'center',
            fontWeight: 600,
            fontSize: 14
        }
    }
})

function SearchForm({ classes }) {
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
                        />
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <FormLabel className="fieldName">Status</FormLabel>
                        <Select
                            variant="outlined"
                        >
                            {constants.BILL_STATUS.map((billStatus) => (
                                <MenuItem value={billStatus.id}>{billStatus.value}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <FormLabel className="fieldName">Search</FormLabel>
                        <TextField
                            variant="outlined"
                        />
                    </FormControl>
                </MuiPickersUtilsProvider>
                <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                >Search</Button>
            </form>
        </div>
    );
}

export default withStyles(styles)(SearchForm);