import {Instance, types} from 'mobx-state-tree';
import {Good, IGood} from './Good';

export const SptGoodStore = types
    .model('SptGoodStore', {
        goods: types.optional(types.array(Good),[]),
        isLoading: types.boolean
    }).actions(self => ({
        add(good: IGood) {
            if (self.goods.indexOf(good) === -1) {
                self.goods.push(good);
            }
        },
        setLoading(loading: boolean) {
            self.isLoading = loading;
        }
    }));

export type ISptGoodStore = Instance<typeof SptGoodStore>;