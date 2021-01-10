import { applySnapshot, types } from 'mobx-state-tree';
import PaymentsService from '../services/PaymentsService';
import Payment from './Payment';

const Payments = types.model('Payments', {
    items: types.array(Payment),
    filterId: types.string
}).actions((self) => ({
    set(data) {
        applySnapshot(self, {...self, ...data});
    },
    fetch(patientId) {
        if (!self.items.length || self.filterId !== patientId) {
            new PaymentsService().fetchPayments(patientId).then((response) => {
                this.set({ items: response.data, filterId: patientId});
            });
        }
    }
}))

export default Payments;