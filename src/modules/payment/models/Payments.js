import { applySnapshot, types } from 'mobx-state-tree';
import PaymentsService from '../services/PaymentsService';
import Payment from './Payment';

const Payments = types.model('Payments', {
    items: types.array(Payment),
    filterId: types.optional(types.string, ''),
    fetchInProgress: types.optional(types.boolean, false)
}).views((self) => ({
    get amountPaid() {
        let total = 0;
        self.items.forEach(item => total = total + item.paidAmount);
        return total;
    }
})).actions((self) => ({
    set(data) {
        applySnapshot(self, {...self, ...data});
    },
    fetch(patientId) {
        if (!self.items.length || self.filterId !== patientId) {
            if (!self.fetchInProgress) {
                this.set({ fetchInProgress: true });
                new PaymentsService().fetchPayments(patientId).then((response) => {
                    this.set({ items: [...response.data], filterId: patientId, fetchInProgress: false});
                });
            }
        }
    }
}))

export default Payments;