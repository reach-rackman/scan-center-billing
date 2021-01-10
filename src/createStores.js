import StoreRegistry from './modules/common/storeRegistry';
import PatientDetails from './modules/patient/model/PatientDetails';
import Patients from './modules/patient/model/Patients';
import ScanList from './modules/common/models/MedicalBillingMaster';
import Payment from './modules/payment/models/Payment';
import Payments from './modules/payment/models/Payments';
import { initialState as patientDetailsInitState } from './modules/patient/model/PatientDetails';
import * as constants from './modules/common/constants';

class CreateStores {
    constructor() {}

    init() {
        this.registerPatientDetailStore();
        this.registerPatientsStore();
        this.registerScanListStore();
        this.registerPaymentStore();
        this.registerPaymentsStore();
    }
    
    registerPatientDetailStore() {
        const patientDetailsStore = {
            name: 'patientDetails',
            spec: PatientDetails,
            initialState: patientDetailsInitState
        };
        StoreRegistry.register(patientDetailsStore);
    }
    
    registerScanListStore() {
        const scanListStore = {
            name: 'scanList',
            spec: ScanList,
            initialState: {
                items: []
            }
        };    
        StoreRegistry.register(scanListStore);
    }

    registerPatientsStore() {
        const patientsStore = {
            name: 'patients',
            spec: Patients,
            initialState: {
                items: []
            }
        };
        StoreRegistry.register(patientsStore);
    }

    registerPaymentStore() {
        const paymentStore = {
            name: 'payment',
            spec: Payment,
            initialState: {
                id: '',
                patientId: '',
                paymentDate: '',
                paidAmount: 0,
                mode: constants.CASH_PAYMENT
            }
        }
        StoreRegistry.register(paymentStore);
    }

    registerPaymentsStore() {
        const paymentsStore = {
            name: 'payments',
            spec: Payments,
            initialState: {
                items: [],
                filterId: ''
            }
        }
        StoreRegistry.register(paymentsStore);
    }

}

export default CreateStores;