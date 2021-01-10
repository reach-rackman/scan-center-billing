import { scanSystemApi } from '../../common/clientManager';
class PatientService {
    getAll() {
        return scanSystemApi.get('patient_details');
    }
}

export default PatientService;