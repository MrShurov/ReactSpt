import {types} from 'mobx-state-tree';

export type BrowserMode = 'Вход' | 'Пользователи' | 'Оборудование';

export const SptCurrentStore = types
    .model('SptCurrentStore', {
        currentUser: types.string,
        mode: types.enumeration('mode', ['Вход', 'Пользователи', 'Оборудование']),
        role: types.string
    })
    .actions(self => ({
        setMode(mode: BrowserMode) {
            self.mode = mode;
        },
        setCurrentUser(currentUser: string){
            self.currentUser = currentUser;
        },
        setRole(role: string){
            self.role = role;
        }
    }));