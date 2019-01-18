import {Instance, types} from 'mobx-state-tree';

export const Good = types.model({
    calculationUrl: types.string,
    description: types.string,
    goodName: types.string,
    imageUrl: types.string,
    type: types.string
});

export type Good = Instance<typeof Good>;

export const SptGoodStore = types
    .model('SptGoodStore', {
        goods: types.optional(types.array(Good),[]),
    })
    .actions(self => ({
        add(good : Good) {
            const foundItem = self.goods.find(i => i.goodName === good.goodName);
            if (!foundItem) {
                self.goods.push(good);
            }
        }
    }));

export type ISptGoodStore = Instance<typeof SptGoodStore>;