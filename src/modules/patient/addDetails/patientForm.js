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
    Button,
    withStyles,
    Typography
} from "@material-ui/core";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import { inject, observer } from 'mobx-react';
import * as constants from '../../common/constants';
import ErrorMsg from '../../common/ErrorMsg';
import MedicalScanDetails from './medicalScanDetails';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const styles = () => ({
    formControl: {
        display: 'flex',
        flexDirection: 'row',
        margin: '3px 0',
        paddingBottom: 20,
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
    formRowWrapper: {
        display: 'flex',
        alignItems: 'center'
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
            margin: '3px 0',
            paddingBottom: 20
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
    },
    addLeft: {
        left: 125
    },
    minimalSize: {
        minWidth: 30
    },
    actionsWrapper: {
        width: '100%',
        textAlign: 'center',
        marginTop: 10
    }
});

function PatientForm({ classes, patientDetails }) {
    const history = useHistory();
    const [shouldValidate, setShouldValidate] = useState(false);
    const formFieldsInValid = patientDetails.formFieldValidations(shouldValidate);
    const handleOnChange = (fieldName, value) => {
        patientDetails.onChange(fieldName, value);
    }
    const handleSave = () => {
        setShouldValidate(true);
        if (patientDetails.isValid()) {
            patientDetails.add();
        }
    }
    useEffect(() => {
        if (patientDetails.updateComplete) {
            history && history.push('/');
            patientDetails.clear();
        }
    }, [patientDetails.updateComplete]);

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <form name="patientDetailsForm">
                <div className={classes.formRowWrapper}>
                    <FormControl className={classes.formControl}>
                        <FormLabel className="fieldName">Patient Name</FormLabel>
                        <Select
                            id="patient-salutation"
                            variant="outlined"
                            classes={{root: classes.minimalSize}}
                            value={patientDetails.salutation}
                            onChange={e => handleOnChange('salutation', e.target.value)}
                        >
                            <MenuItem value={constants.SALUTATION_MR}>{constants.SALUTATION_MR}</MenuItem>
                            <MenuItem value={constants.SALUTATION_MRS}>{constants.SALUTATION_MRS}</MenuItem>
                            <MenuItem value={constants.SALUTATION_MISS}>{constants.SALUTATION_MISS}</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <TextField
                            id="patientName"
                            value={patientDetails.patientName}
                            label="Patient Name"
                            variant="outlined"
                            onChange={e => handleOnChange('patientName', e.target.value)}
                        />
                        {formFieldsInValid.name && (
                            <ErrorMsg fieldName="Name" />
                        )}
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <FormLabel className="fieldName">Gender</FormLabel>
                        <RadioGroup
                            name="gender"
                            value={patientDetails.gender}
                            onChange={e => handleOnChange('gender', e.target.value)}
                            className={classes.genderRadio}
                        >
                            <FormControlLabel value="Male" control={<Radio color="primary" />} label="Male" />
                            <FormControlLabel value="Female" control={<Radio color="primary" />} label="Female" />
                        </RadioGroup>
                        {formFieldsInValid.gender && (
                            <ErrorMsg fieldName="Gender" className={classes.addLeft} />
                        )}
                    </FormControl>
                </div>
                <div className={classes.formRowWrapper}>
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
                            onChange={date => handleOnChange('dob', date.getTime())}
                            className={classes.datepicker}
                        />
                        {formFieldsInValid.dob && (
                            <ErrorMsg fieldName="DOB" className={classes.addLeft} />
                        )}
                    </FormControl>
                    <FormControl className={classes.formControl}>
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
                </div>
                <div className={classes.formRowWrapper}>
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
                            onChange={date => handleOnChange('appointmentDate', date.getTime())}
                            className={classes.datepicker}
                        />
                        {formFieldsInValid.appointment && (
                            <ErrorMsg fieldName="Appointment Date" className={classes.addLeft} />
                        )}
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <FormLabel className="fieldName">Phone number</FormLabel>
                        <TextField
                            value={patientDetails.phoneNumber}
                            onChange={e => handleOnChange('phoneNumber', parseInt(e.target.value))}
                            id="phoneNumber"
                            type="number"
                            label="Phone number"
                            variant="outlined"
                        />
                        {formFieldsInValid.phonenumber && (
                            <ErrorMsg fieldName="Phone number" className={classes.addLeft} />
                        )}
                    </FormControl>
                </div>
                <div className={classes.formRowWrapper}>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <FormLabel className="fieldName addressFieldName">Address</FormLabel>
                        <div className={classes.addressFieldsWrapper}>
                            <FormControl>
                                <TextField
                                    id="street"
                                    label="Street"
                                    variant="outlined"
                                    value={patientDetails.address.street}
                                    onChange={e => patientDetails.address.onChange('street', e.target.value)}
                                />
                                {formFieldsInValid.street && (
                                    <ErrorMsg fieldName="Street" />
                                )}
                            </FormControl>
                            <FormControl>
                                <TextField
                                    id="locality"
                                    label="Locality"
                                    variant="outlined"
                                    value={patientDetails.address.locality}
                                    onChange={e => patientDetails.address.onChange('locality', e.target.value)}
                                />
                            </FormControl>
                            <div className={classes.addressInnerWrapper}>
                                <FormControl>
                                    <TextField
                                        id="city"
                                        label="City"
                                        variant="outlined"
                                        value={patientDetails.address.city}
                                        onChange={e => patientDetails.address.onChange('city', e.target.value)}
                                    />
                                    {formFieldsInValid.city && (
                                        <ErrorMsg fieldName="City" />
                                    )}
                                </FormControl>
                                <FormControl>
                                    <TextField
                                        id="state"
                                        label="State / Province"
                                        variant="outlined"
                                        value={patientDetails.address.state}
                                        onChange={e => patientDetails.address.onChange('state', e.target.value)}
                                    />
                                    {formFieldsInValid.state && (
                                        <ErrorMsg fieldName="State" />
                                    )}
                                </FormControl>
                                <FormControl>
                                    <TextField
                                        id="pincode"
                                        type="number"
                                        label="Zip / Pin Code"
                                        variant="outlined"
                                        value={patientDetails.address.pincode}
                                        onChange={e => patientDetails.address.onChange('pincode', parseInt(e.target.value))}
                                    />
                                    {formFieldsInValid.pincode && (
                                        <ErrorMsg fieldName="Pincode" />
                                    )}
                                </FormControl>
                                <FormControl className={classes.formControl}>
                                    <Select
                                        id="country"
                                        variant="outlined"
                                        value={patientDetails.address.country}
                                        label="Country"
                                        onChange={e => patientDetails.address.onChange('country', e.target.value)}
                                    >
                                        <MenuItem value={constants.EMPTY}><em>None</em></MenuItem>
                                        <MenuItem value={constants.COUNTRY_INDIA}>{constants.COUNTRY_INDIA}</MenuItem>
                                    </Select>
                                    {formFieldsInValid.country && (
                                        <ErrorMsg fieldName="Country" />
                                    )}
                                </FormControl>
                            </div>
                        </div>
                    </FormControl>
                </div>
                <MedicalScanDetails showError={formFieldsInValid.scanList} />
                <div className={classes.actionsWrapper}>
                    <Button
                        variant="outlined"
                        color="primary"
                        size="large"
                        onClick={handleSave}
                        disabled={patientDetails.updatePending}
                    >Save / Submit</Button>
                </div>
            </form>
        </MuiPickersUtilsProvider>
    )
}

export default withStyles(styles)(inject('patientDetails')(observer(PatientForm)));