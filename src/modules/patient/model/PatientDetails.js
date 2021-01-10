import { v4 as uuid } from 'uuid';
import { applySnapshot, types } from 'mobx-state-tree';
import { differenceInYears, differenceInMonths } from 'date-fns';
import * as constants from '../../common/constants';
import AddPatientService from '../addDetails/service/addPatientService';
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
    }
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
    dob: types.maybeNull(types.string),
    age: types.maybeNull(types.number),
    ageType: types.maybeNull(types.string),
    phoneNumber: types.maybeNull(types.number),
    appointmentDate: types.maybeNull(types.string),
    address: types.maybe(Address),
    selectedScans: types.optional(types.array(MedicalBilling), []),
    totalAmount: types.optional(types.number, 0),
    totalDiscount: types.optional(types.number, 0),
    updatePending: types.optional(types.boolean, false),
    updateError: types.optional(types.boolean, false),
    updateComplete: types.optional(types.boolean, false)
}).actions((self) => ({
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
        applySnapshot(self, data);
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
        .then((response) => {
            this.set({ ...self, updatePending: false, updateComplete: true });
        })
        .catch((error) => {
            this.set({ ...self, updateError: true, updatePending: false });
        });
    },
    addScanItem(scanItem) {
        const selectedScans = [...self.selectedScans];
        selectedScans.push(scanItem);
        this.set({...self, selectedScans});
    }
}));

export default PatientDetails;
