import {types} from 'mobx-state-tree';

export type BrowserMode = 'Вход' | 'Пользователи' | 'Оборудование';

export const SptCurrentStore = types
    .model('SptCurrentStore', {
        mode: types.enumeration('mode', ['Вход', 'Пользователи', 'Оборудование'])
    })
    .actions(self => ({
        setMode(mode: BrowserMode) {
            self.mode = mode;
        }
    }));