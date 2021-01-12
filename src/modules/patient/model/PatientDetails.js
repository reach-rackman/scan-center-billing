import { v4 as uuid } from 'uuid';
import { applySnapshot, types } from 'mobx-state-tree';
import { differenceInYears, differenceInMonths } from 'date-fns';
import * as constants from '../../common/constants';
import AddPatientService from '../addDetails/service/addPatientService';
import PatientService from '../services/PatientService';
import { MedicalBilling } from '../../common/models/MedicalBillingMaster';

export const initialState = {
    salutation: constants.SALUTATION_MR,
    patientName: '',
    ageType: constants.AGE_TYPE_YEARS,
    address: {
        street: '',
        locality: '',
        city: '',
        state: '',
        pincode: 0,
        country: ''
    },
    paymentStatus: constants.BILL_STATUS.NOT_YET_STARTED.id
};

const Address = types.model('Address', {
    street: types.string,
    locality: types.optional(types.string, ''),
    city: types.string,
    state: types.string,
    pincode: types.number,
    country: types.string
}).actions((self) => ({
    onChange(fieldName, value) {
        const data = {...self};
        data[fieldName] = value;
        applySnapshot(self, data);
    }
}));

const PatientDetails = types.model('PatientDetails', {
    id: types.maybeNull(types.string),
    salutation: types.string,
    patientName: types.maybeNull(types.string),
    gender: types.maybeNull(types.string),
    dob: types.maybeNull(types.number),
    age: types.maybeNull(types.number),
    ageType: types.maybeNull(types.string),
    phoneNumber: types.maybeNull(types.number),
    appointmentDate: types.maybeNull(types.number),
    address: types.maybe(Address),
    paymentStatus: types.string,
    selectedScans: types.optional(types.array(MedicalBilling), []),
    totalAmount: types.optional(types.number, 0),
    totalDiscount: types.optional(types.number, 0),
    amountPaid: types.optional(types.number, 0),
    updatePending: types.optional(types.boolean, false),
    updateError: types.optional(types.boolean, false),
    updateComplete: types.optional(types.boolean, false)
}).views((self) => ({
    formFieldValidations(validate) {
        let result = {};
        if (validate) {
            result = {
                name: !self.patientName,
                gender: !self.gender,
                dob: !self.dob,
                appointment: !self.appointmentDate,
                phonenumber: !self.phoneNumber,
                street: !self.address?.street,
                city: !self.address?.city,
                state: !self.address?.state,
                pincode: !self.address?.pincode,
                country: !self.address?.country,
                scanList: !self.selectedScans.length
            };
        }
        return result;
    },
    isValid() {
        const validationVals = Object.values(self.formFieldValidations(true));
        debugger
        return !validationVals.length || !validationVals.includes(true);
    }
})).actions((self) => ({
    onChange(fieldName, value) {
        const data = {...self};
        data[fieldName] = value;
        if (fieldName === 'dob') {
            const diffInYears = differenceInYears(new Date(), new Date(value));
            if (diffInYears <= 0) {
                const diffInMonths = differenceInMonths(new Date(), new Date(value));
                data['age'] = diffInMonths;
                data['ageType'] = constants.AGE_TYPE_MONTHS;
            } else {
                data['age'] = diffInYears;
                data['ageType'] = constants.AGE_TYPE_YEARS;
            }
        }
        applySnapshot(self, data);
    },
    set(data) {
        applySnapshot(self, {...self, ...data});
    },
    clear() {
        applySnapshot(self, initialState);
    },
    add() {
        const payload = {...self};
        payload.id = 'ATH' + uuid().replace('-', '').substring(0,5);
        delete payload.updateComplete;
        delete payload.updateError;
        delete payload.updatePending;
        applySnapshot(self, { ...self, updatePending: true });

        let totalCost = 0, totalDisc = 0;
        self.selectedScans.forEach((scan) => {
            totalDisc = totalDisc + scan.appliedDiscAmt;
            totalCost = totalCost + scan.totalAmount;
        });
        payload.totalAmount = totalCost;
        payload.totalDiscount = totalDisc;

        const addPatientServ = new AddPatientService();
        addPatientServ.addPatient(payload)
        .then(() => {
            this.set({ ...self, updatePending: false, updateComplete: true });
        })
        .catch(() => {
            this.set({ ...self, updateError: true, updatePending: false });
        });
    },
    addScanItem(scanItem) {
        const selectedScans = [...self.selectedScans];
        selectedScans.push(scanItem);
        this.set({...self, selectedScans});
    },
    updatePaymentStatus(patientId, status, amountPaid) {
        const patientService = new PatientService();
        patientService.updatePaymentStatus(patientId, { paymentStatus: status, amountPaid });
    },
    update() {
        const payload = {...self};
        delete payload.updateComplete;
        delete payload.updateError;
        delete payload.updatePending;
    },
    removeScan(scanToRemove) {
        const filteredScans = self.selectedScans.filter((scan) => scan.id !== scanToRemove.id);
        self.set({selectedScans: filteredScans});
    }
}));

export default PatientDetails;
