import { applySnapshot, types } from 'mobx-state-tree';
import { v4 as uuid } from 'uuid';
import PaymentsService from '../services/PaymentsService';

const Payment = types.model('Payment', {
    id: types.string,
    patientId: types.string,
    paymentDate: types.string,
    paidAmount: types.number,
    mode: types.string,
    saveInProgress: types.optional(types.boolean, false),
    paymentSuccessful: types.optional(types.boolean, false)
}).actions((self) => ({
    set(data) {
        applySnapshot(self, {...self, ...data});
    },
    onChange(fieldName, value) {
        const data = {...self};
        data[fieldName] = value;
        this.set(data);
    },
    makePayment(patientId) {
        const payload = {...self};
        applySnapshot(self, { ...self, saveInProgress: true, paymentSuccessful: false });
        payload.id = uuid();
        payload.patientId = patientId;
        payload.paymentDate = new Date().toDateString();
        new PaymentsService().makePayment(payload).then(response => {
            applySnapshot(self, { ...self, saveInProgress: false, paymentSuccessful: true });
        });
    }
}));

export default Payment;