import { scanSystemApi } from "../../common/clientManager";

export default class PaymentsService {
    fetchPayments(patientId) {
        if (patientId) {
            return scanSystemApi.get('/payment_details?patientId=' + patientId);
        } else {
            return scanSystemApi.get('/payment_details');
        }
    }
    makePayment(payload) {
        return scanSystemApi.post('/payment_details', payload);
    }
}