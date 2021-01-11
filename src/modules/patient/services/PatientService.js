import { scanSystemApi } from '../../common/clientManager';
class PatientService {
    getAll() {
        return scanSystemApi.get('patient_details');
    }

    search(searchCriteria) {
        let url = '/patient_details?';
        if (searchCriteria.startDate && searchCriteria.endDate) {
            url += `appointmentDate_gte=${searchCriteria.startDate}&appointmentDate_lte=${searchCriteria.endDate}&`;
        }

        if (searchCriteria.paymentStatus) {
            url += `paymentStatus=${searchCriteria.paymentStatus}&`
        }

        if (searchCriteria.searchString) {
            url += `patientName_like=${searchCriteria.searchString}&`
        }

        url = url.slice(0, url.length - 1);

        return scanSystemApi.get(url);
    }

    updatePaymentStatus(patientId, payload) {
        return scanSystemApi.patch(`/patient_details/${patientId}`, payload);
    }
}

export default PatientService;