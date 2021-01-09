import 'date-fns';
import DateFnsUtils from '@date-io/date-fns'; 
import {
    FormControl,
    FormControlLabel,
    FormLabel,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    TextField,
    withStyles
} from "@material-ui/core";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import { inject, observer } from 'mobx-react';
import * as constants from '../../common/constants';

const styles = () => ({
    formControl: {
        display: 'flex',
        flexDirection: 'row',
        margin: '10px 0',
        '& > *': {
            margin: '0 5px'
        },
        '& .fieldName': {
            minWidth: 100,
            maxWidth: 100,
            marginRight: 20,
            display: 'flex',
            alignItems: 'center',
            fontWeight: 600,
            fontSize: 14
        },
        '& .addressFieldName': {
            alignItems: 'initial',
            paddingTop: 5
        }
    },
    datepicker: {
        minWidth: 300
    },
    ageField: {
        maxWidth: 80
    },
    addressFieldsWrapper: {
        display: 'flex',
        flexDirection: 'column',
        width: '70%',
        '& > *': {
            margin: '5px 0'
        }
    },
    addressInnerWrapper: {
        display: 'flex',
        flexDirection: 'row',
        '& > *': {
            margin: '0 5px',
            '&:first-child': {
                marginLeft: 0
            },
            '&:last-child': {
                marginRight: 0
            }
        },
        '& .halfInput': {
            display: 'initial',
            width: '50%',
            '& .MuiInputBase-root': {
                width: '100%'
            }
        }
    },
    genderRadio: {
        display: 'flex',
        flexDirection: 'row'
    }
});

function PatientForm({ classes, patientDetails }) {
    const handleChange = () => { };
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <form name="patientDetailsForm">
            <FormControl variant="outlined" className={classes.formControl}>
                <FormLabel className="fieldName">Patient Name</FormLabel>
                <Select
                    id="patient-salutation"
                    value={patientDetails.salutation}
                    onChange={e => patientDetails.onChange('salutation', e.target.value)}
                >
                    <MenuItem value={constants.SALUTATION_MR}>{constants.SALUTATION_MR}</MenuItem>
                    <MenuItem value={constants.SALUTATION_MRS}>{constants.SALUTATION_MRS}</MenuItem>
                    <MenuItem value={constants.SALUTATION_MISS}>{constants.SALUTATION_MISS}</MenuItem>
                </Select>
                <TextField
                    id="patientName"
                    value={patientDetails.patientName}
                    label="Patient Name"
                    variant="outlined"
                    onChange={e => patientDetails.onChange('patientName', e.target.value)}
                />

                <FormLabel className="fieldName">Gender</FormLabel>
                <RadioGroup
                    name="gender"
                    value={patientDetails.gender}
                    onChange={e => patientDetails.onChange('gender', e.target.value)}
                    className={classes.genderRadio}
                >
                    <FormControlLabel value="male" control={<Radio color="primary" />} label="Male" />
                    <FormControlLabel value="female" control={<Radio color="primary" />} label="Female" />
                </RadioGroup>
            </FormControl>
            <FormControl variant="outlined" className={classes.formControl}>
                <FormLabel className="fieldName">DOB</FormLabel>
                <DatePicker
                    autoOk
                    disableFuture
                    inputVariant="outlined"
                    openTo="year"
                    format="dd/MM/yyyy"
                    label="Date of Birth"
                    views={["year", "month", "date"]}
                    value={patientDetails.dob}
                    onChange={date => patientDetails.onChange('dob', date.toDateString())}
                    className={classes.datepicker}
                />

                <FormLabel className="fieldName">Age</FormLabel>
                <TextField
                    id="age"
                    variant="outlined"
                    disabled
                    value={patientDetails.age}
                    className={classes.ageField}
                />
                <Select
                    id="patient-age-type"
                    value={patientDetails.ageType}
                    disabled
                >
                    <MenuItem value={constants.AGE_TYPE_YEARS}>{constants.AGE_TYPE_YEARS}</MenuItem>
                    <MenuItem value={constants.AGE_TYPE_MONTHS}>{constants.AGE_TYPE_MONTHS}</MenuItem>
                </Select>
            </FormControl>
            <FormControl variant="outlined" className={classes.formControl}>
                <FormLabel className="fieldName">Appointment Date</FormLabel>
                <DatePicker
                    autoOk
                    disablePast
                    inputVariant="outlined"
                    openTo="year"
                    format="dd/MM/yyyy"
                    label="Appointment Date"
                    views={["year", "month", "date"]}
                    value={patientDetails.appointmentDate}
                    onChange={date => patientDetails.onChange('appointmentDate', date.toDateString())}
                    className={classes.datepicker}
                />

                <FormLabel className="fieldName">Phone number</FormLabel>
                <TextField
                    value={patientDetails.phoneNumber}
                    onChange={e => patientDetails.onChange('phoneNumber', parseInt(e.target.value))}
                    id="phoneNumber"
                    type="number"
                    label="Phone number"
                    variant="outlined"
                />
            </FormControl>
            <FormControl variant="outlined" className={classes.formControl}>
                <FormLabel className="fieldName addressFieldName">Address</FormLabel>
                <div className={classes.addressFieldsWrapper}>
                    <TextField
                        id="street"
                        label="Street"
                        variant="outlined"
                        value={patientDetails.address.street}
                        onChange={e => patientDetails.address.onChange('street', e.target.value)}
                    />
                    <TextField
                        id="locality"
                        label="Locality"
                        variant="outlined"
                        value={patientDetails.address.locality}
                        onChange={e => patientDetails.address.onChange('locality', e.target.value)}
                    />
                    <div className={classes.addressInnerWrapper}>
                        <TextField
                            id="city"
                            label="City"
                            variant="outlined"
                            className='halfInput'
                            value={patientDetails.address.city}
                            onChange={e => patientDetails.address.onChange('city', e.target.value)}
                        />
                        <TextField
                            id="state"
                            label="State / Province"
                            variant="outlined"
                            className='halfInput'
                            value={patientDetails.address.state}
                            onChange={e => patientDetails.address.onChange('state', e.target.value)}
                        />
                        <TextField
                            id="pincode"
                            type="number"
                            label="Zip / Pin Code"
                            variant="outlined"
                            className='halfInput'
                            value={patientDetails.address.pincode}
                            onChange={e => patientDetails.address.onChange('pincode', parseInt(e.target.value))}
                        />
                        <Select
                            id="country"
                            value={patientDetails.address.country}
                            label="Country"
                            className='halfInput'
                            onChange={e => patientDetails.address.onChange('country', e.target.value)}
                        >
                            <MenuItem value={constants.EMPTY}><em>None</em></MenuItem>
                            <MenuItem value={constants.COUNTRY_INDIA}>{constants.COUNTRY_INDIA}</MenuItem>
                        </Select>
                    </div>
                </div>
            </FormControl>
        </form>
        </MuiPickersUtilsProvider>
    )
}

export default withStyles(styles)(inject('patientDetails')(observer(PatientForm)));