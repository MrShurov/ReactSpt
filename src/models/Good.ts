import {Instance, types} from 'mobx-state-tree';

export const Good = types
    .model('Good', {
        goodName: types.string,
    }).actions(self => ({
        setGoodName(name: string) {
            self.goodName = name;
        }
    }));

export type IGood = Instance<typeof Good>;