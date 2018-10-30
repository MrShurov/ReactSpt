import {Instance, types} from 'mobx-state-tree';

export const SptUserStore = types
    .model('SptUserStore', {
    });

export type ISptUserStore = Instance<typeof SptUserStore>;