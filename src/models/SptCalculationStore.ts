import {types} from 'mobx-state-tree';

export const SptCalculationStore = types
    .model('SptCalculationStore', {
        price: types.number
    })
    .actions(self => ({
        setPrice(price: number) {
            self.price = price;
        }
    }));