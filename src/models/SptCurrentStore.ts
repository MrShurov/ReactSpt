import {types} from 'mobx-state-tree';

export type BrowserMode = 'login' | 'user' | 'goods';

export const SptCurrentStore = types
    .model('SptCurrentStore', {
        mode: types.enumeration('mode', ['login', 'user', 'goods'])
    })
    .actions(self => ({
        setMode(mode: BrowserMode) {
            self.mode = mode;
        }
    }));