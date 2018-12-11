import {Instance, types} from 'mobx-state-tree';
import {SptUserStore} from './SptUserStore';
import {SptGoodStore} from './SptGoodStore';
import {SptCurrentStore} from './SptCurrentStore';

export const SptStore = types
    .model('SptStore', {
        current: SptCurrentStore,
        sptGoodStore: SptGoodStore,
        sptUserStore: SptUserStore
    });

export type ISptStore = Instance<typeof SptStore>;