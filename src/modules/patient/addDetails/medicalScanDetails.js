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
    withStyles,
    IconButton
} from "@material-ui/core";
import { inject, observer } from 'mobx-react';
import PageHeader from "../../common/PageHeader";
import { Autocomplete } from '@material-ui/lab';
import ErrorMsg from '../../common/ErrorMsg';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = (theme) => ({
    wrapper: {
        width: '100%'
    },
    form: {
        display: 'flex',
        margin: '10px 0',
        flexDirection: 'row'
    },
    formControl: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
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
        width: '15vw'
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
    errorMsgWrapper: {
        width: '100%',
        textAlign: 'center',
        position: 'relative'
    },
    errorMsg: {
        position: 'initial'
    }
});

function MedicalScanDetails({ classes, patientDetails, scanList, showError }) {
    const [selectedScan, setSelectedScan] = useState({});
    const [discount, setDiscount] = useState(0);
    const [discountError, setDiscountError] = useState();

    useEffect(() => {
        if (scanList) {
            scanList.fetch();
        }
    }, [scanList]);

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
            scanItem.appliedDiscAmt = Math.round(scanItem.scanAmount * discount/100);
            scanItem.totalAmount = scanItem.scanAmount - scanItem.appliedDiscAmt;
        }
        patientDetails.addScanItem(scanItem);
    }

    const handleDiscount = (value) => {
        setDiscount(value)
        setDiscountError(value < 0 || value > (selectedScan.maxDiscAmt || selectedScan.maxDiscPrct));
    }

    return (
        <div className={classes.wrapper}>
            <PageHeader pageName="Medical Scan Details" />
            <form name="scanDetailsForm" className={`${classes.form}  ${classes.scanForm}`}>
                <FormControl variant="outlined" className={classes.formControl}>
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
                </FormControl>
                <FormControl className={classes.formControl}>
                    <FormLabel className="fieldName">Scan Amount</FormLabel>
                    <FormLabel className="fieldName" color="primary">
                        <Typography variant="h6" color="primary">{selectedScan.scanAmount}</Typography>
                    </FormLabel>
                </FormControl>
                <FormControl className={classes.formControl}>
                    <FormLabel className="fieldName">
                        Discount {selectedScan.maxDiscPrct ? '(%)' : '(INR)'}
                    </FormLabel>
                    <TextField
                        id="discount"
                        type="number"
                        value={discount}
                        label="Discount"
                        variant="outlined"
                        onChange={e => handleDiscount(parseInt(e.target.value))}
                        inputProps={{
                            max: selectedScan.maxDiscAmt || selectedScan.maxDiscPrct || 0
                        }}
                    />
                    {discountError && (
                        <ErrorMsg msg={`Min:0 & Max: ${selectedScan.maxDiscAmt || selectedScan.maxDiscPrct} `} />
                    )}
                </FormControl>
                <FormControl className={classes.formControl}>
                    <Button
                        variant="outlined"
                        color="primary"
                        disabled={!selectedScan.medicalBilling || discountError}
                        onClick={handleScanAddition}
                    >Add</Button>
                </FormControl>
            </form>
            <div className={classes.errorMsgWrapper}>
                {showError && (
                    <ErrorMsg className={classes.errorMsg} fieldName="Atleast 1 scan" />
                )}
            </div>
            <Table className={classes.table}>
                <TableHead className={classes.tableHead}>
                    <TableRow>
                        <TableCell className={classes.tableCell}>S No.</TableCell>
                        <TableCell className={classes.tableCell}>Scan Name</TableCell>
                        <TableCell className={classes.tableCell}>Scan Amount</TableCell>
                        <TableCell className={classes.tableCell}>Discount</TableCell>
                        <TableCell className={classes.tableCell}>Total Amount</TableCell>
                        <TableCell className={classes.tableCell}></TableCell>
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
                            <TableCell>
                                <IconButton onClick={() => patientDetails.removeScan(scan)}>
                                    <DeleteIcon
                                        color="primary"
                                        fontSize="small"
                                    />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                    {patientDetails.selectedScans.length === 0 && (
                        <TableRow>
                            <TableCell colSpan="5">Scans yet to be added!</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}

export default withStyles(styles)(inject(
    'patientDetails',
    'scanList'
)(observer(MedicalScanDetails)));