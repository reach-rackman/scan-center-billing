import StoreRegistry from './modules/common/storeRegistry';
import PatientDetails from './modules/patient/addDetails/model/PatientDetails';
import ScanList from './modules/common/models/MedicalBillingMaster';
import * as constants from './modules/common/constants';

class CreateStores {
    constructor() {}

    init() {
        this.registerPatientDetailStore();
        this.registerScanListStore();
    }
    
    registerPatientDetailStore() {
        const patientDetailsStore = {
            name: 'patientDetails',
            spec: PatientDetails,
            initialState: {
                salutation: constants.SALUTATION_MR,
                patientName: '',
                ageType: constants.AGE_TYPE_YEARS,
                address: {
                    street: '',
                    locality: '',
                    city: '',
                    state: '',
                    pincode: 0,
                    country: ''
                }
            }
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
}

export default CreateStores;