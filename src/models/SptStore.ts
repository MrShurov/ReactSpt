import {Instance, types} from 'mobx-state-tree';
import {SptUserStore} from './SptUserStore';
import {SptGoodStore} from './SptGoodStore';

export const SptStore = types
    .model('SptStore', {
        sptGoodStore: SptGoodStore,
        sptUserStore: SptUserStore
    });

export type ISptStore = Instance<typeof SptStore>;