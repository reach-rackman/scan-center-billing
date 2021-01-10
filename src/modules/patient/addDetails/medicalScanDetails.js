import { useEffect, useState } from 'react';
import {
    Button,
    FormControl,
    FormLabel,
    Table,
    TableCell,
    TableHead,
    TableBody,
    TableRow,
    TextField,
    Typography,
    withStyles
} from "@material-ui/core";
import { inject, observer } from 'mobx-react';
import PageHeader from "../../common/PageHeader";
import { Autocomplete } from '@material-ui/lab';
import { useHistory } from 'react-router-dom';

const styles = (theme) => ({
    wrapper: {
        width: '100%'
    },
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
        }
    },
    scanForm: {
        '& > *': {
            margin: '0 10px'
        },
    },
    autocomplete: {
        minWidth: 200
    },
    table: {
        marginTop: 30
    },
    tableHead: {
        backgroundColor: theme.palette.primary.main,
    },
    tableCell: {
        color: theme.palette.secondary.main
    },
    actionWrapper: {
        width: '100%',
        textAlign: 'center',
        marginTop: 20
    }
});

function MedicalScanDetails({ classes, patientDetails, scanList }) {
    const history = useHistory();
    const [selectedScan, setSelectedScan] = useState({});
    const [discount, setDiscount] = useState(0);

    useEffect(() => {
        if (scanList) {
            scanList.fetch();
        }
    }, [scanList]);

    useEffect(() => {
        if (patientDetails.updateComplete) {
            history && history.push('/');
            patientDetails.clear();
        }
    }, [patientDetails.updateComplete])

    const handleSave = () => {
        patientDetails.add();
    };

    const handleScanItemSelection = (selectedScan) => {
        setSelectedScan(selectedScan);
        setDiscount(0);
    }

    const handleScanAddition = () => {
        const scanItem = {...selectedScan};
        if (scanItem.maxDiscAmt) {
            // Amount disc
            scanItem.appliedDiscAmt = discount;
            scanItem.totalAmount = scanItem.scanAmount - scanItem.appliedDiscAmt;
        } else if (scanItem.maxDiscPrct) {
            // Percentage disc
            scanItem.appliedDiscAmt = (scanItem.scanAmount * discount/100);
            scanItem.totalAmount = scanItem.scanAmount - scanItem.appliedDiscAmt;
        }
        patientDetails.addScanItem(scanItem);
    }

    return (
        <div className={classes.wrapper}>
            <PageHeader pageName="Medical Scan Details" />
            <form name="scanDetailsForm">
                <FormControl variant="outlined" className={`${classes.formControl} ${classes.scanForm}`}>
                    <FormLabel className="fieldName">Scan List</FormLabel>
                    <Autocomplete
                        options={scanList.items}
                        getOptionLabel={option => option.medicalBilling}
                        onChange={(e, scan) => handleScanItemSelection(scan)}
                        disableClearable
                        className={classes.autocomplete}
                        renderInput={params => (
                            <TextField
                                {...params}
                                variant="outlined"
                                label="Scan Search"
                                InputProps={{ ...params.InputProps, type: 'search' }}
                            />
                        )}
                    />
                    <FormLabel className="fieldName">Scan Amount</FormLabel>
                    <FormLabel className="fieldName" color="primary">
                        <Typography variant="h6" color="primary">{selectedScan.scanAmount}</Typography>
                    </FormLabel>
                    <FormLabel className="fieldName">
                        Discount {selectedScan.maxDiscPrct ? '(%)' : '(INR)'}
                    </FormLabel>
                    <TextField
                        id="discount"
                        type="number"
                        value={discount}
                        label="Discount"
                        variant="outlined"
                        onChange={e => setDiscount(parseInt(e.target.value))}
                        inputProps={{
                            max: selectedScan.maxDiscAmt || selectedScan.maxDiscPrct || 0
                        }}
                    />
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={handleScanAddition}
                    >Add</Button>
                </FormControl>
            </form>
            <Table className={classes.table}>
                <TableHead className={classes.tableHead}>
                    <TableRow>
                        <TableCell className={classes.tableCell}>S No.</TableCell>
                        <TableCell className={classes.tableCell}>Scan Name</TableCell>
                        <TableCell className={classes.tableCell}>Scan Amount</TableCell>
                        <TableCell className={classes.tableCell}>Discount</TableCell>
                        <TableCell className={classes.tableCell}>Total Amount</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {patientDetails.selectedScans.map((scan, index) => (
                        <TableRow>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{scan.medicalBilling}</TableCell>
                            <TableCell>{scan.scanAmount} INR</TableCell>
                            <TableCell>{scan.appliedDiscAmt} INR</TableCell>
                            <TableCell>{scan.totalAmount}</TableCell>
                        </TableRow>
                    ))}
                    {patientDetails.selectedScans.length === 0 && (
                        <TableRow>
                            <TableCell colSpan="5">Scans yet to be added!</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <div className={classes.actionWrapper}>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleSave}
                    disabled={patientDetails.updatePending}
                >Save</Button>
            </div>
        </div>
    )
}

export default withStyles(styles)(inject(
    'patientDetails',
    'scanList'
)(observer(MedicalScanDetails)));