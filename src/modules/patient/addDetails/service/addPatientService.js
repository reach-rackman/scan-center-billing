import { scanSystemApi } from '../../../common/clientManager';

class AddPatientService {
    addPatient(payload) {
        return scanSystemApi.post('/patient_details', payload);
    }
}

export default AddPatientService;