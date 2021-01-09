import { scanSystemApi } from '../clientManager';

class MedicalBillingService {
    getScanList() {
        return scanSystemApi.get('/medical_billing_master');
    }
}

export default MedicalBillingService;