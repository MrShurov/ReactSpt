import {Instance, types} from 'mobx-state-tree';

export const SptGoodStore = types
    .model('SptGoodStore', {
        goodName: types.string,
        isLoading: types.boolean
    }).actions(self => ({
        setGoodName(name: string) {
            self.goodName = name;
        },
        setLoading(loading: boolean) {
            self.isLoading = loading;
        }
    }));

export type ISptGoodStore = Instance<typeof SptGoodStore>;