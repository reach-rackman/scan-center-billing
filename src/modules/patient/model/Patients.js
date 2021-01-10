import PatientDetails from './PatientDetails';
import { applySnapshot, types } from 'mobx-state-tree';
import PatientService from '../services/PatientService';

const Patients = types.model('Patients', {
    items: types.array(PatientDetails)
}).actions((self) => ({
    set(data) {
        applySnapshot(self, {...self, ...data});
    },
    fetch() {
        const patientService = new PatientService();
        patientService.getAll().then((response) => {
            this.set({ items: response.data });
        });
    },
    getPatient(patientId) {
        const patientService = new PatientService();
        return new Promise((resolve, reject) => {
            if (self.items.length > 0) {
                const result = self.items.filter(item => item.id === patientId)
                result.length ? resolve(result[0]) : reject(null);
            } else {
                patientService.getAll().then((response) => {
                    this.set({ items: response.data });
                    const result = self.items.filter(item => item.id === patientId)
                    result.length ? resolve(result[0]) : reject(null);
                });
            }
        });
    }
}));

export default Patients;