import {Instance, types} from 'mobx-state-tree';
import {SptUserStore} from './SptUserStore';

export const SptStore = types
    .model('SptStore', {
        sptUserStore: SptUserStore,
    });

export type ISptStore = Instance<typeof SptStore>;