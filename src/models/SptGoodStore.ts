import {Instance, types} from 'mobx-state-tree';

const Good = types.model({
    goodName: types.string,
});

export const SptGoodStore = types
    .model('SptGoodStore', {
        goods: types.optional(types.array(Good),[]),
    })
    .actions(self => ({
        add(goodName: string) {
            const foundItem = self.goods.find(i => i.goodName === goodName);
            if (!foundItem) {
                self.goods.push({goodName});
            }
        }
    }));

export type ISptGoodStore = Instance<typeof SptGoodStore>;