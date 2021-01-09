import { applySnapshot, types } from 'mobx-state-tree';
import MedicalBillingService from '../services/medicalBillingService';


export const MedicalBilling = types.model('MedicalBilling', {
    id: types.string,
    medicalBilling: types.string,
    scanAmount: types.number,
    maxDiscAmt: types.optional(types.number, 0),
    maxDiscPrct: types.optional(types.number, 0),
    modality: types.string,
    appliedDiscAmt: types.optional(types.number, 0),
    appliedDiscPrct: types.optional(types.number, 0),
    totalAmount: types.optional(types.number, 0)
}).views((self) => ({
    get discountAmountForPrct() {
        return (self.scanAmount * self.appliedDiscPrct/100);
    }
}));

const ScanList = types.model('ScanList', {
    items: types.array(MedicalBilling),
    fetchPending: types.optional(types.boolean, false),
    fetchError: types.optional(types.boolean, false)
}).actions((self) => ({
    set(data) {
        applySnapshot(self, { ...self, ...data });
    },
    fetch() {
        applySnapshot(self, { ...self, fetchPending: true });
        const medicalBillingService = new MedicalBillingService();
        medicalBillingService.getScanList()
            .then((response) => {
                this.set({ items: response.data, fetchPending: false });
            })
            .catch(() => {
                applySnapshot(self, { ...self, fetchError: true, fetchPending: false });
            });
    }
}));

export default ScanList;