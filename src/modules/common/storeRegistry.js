class StoreRegistry {
    static stores = {}
        
    static register(store) {
        const { name, initialState, spec } = store;
        if (name) {
            if (this.stores[name]) {
                return new Error('Duplicate store creation!');
            }
            const createdStore = spec.create(initialState);
            this.stores[name] = createdStore;
        } else {
            return new Error('Store name cannot be empty!');
        }
    }

    static getStores() {
        return this.stores;
    }

    static getStore(name) {
        return this.stores[name];
    }
}

export default StoreRegistry;

