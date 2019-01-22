import {Instance, types} from 'mobx-state-tree';
import {SptUserStore} from './SptUserStore';
import {SptGoodStore} from './SptGoodStore';
import {SptCurrentStore} from './SptCurrentStore';
import {SptCalculationStore} from './SptCalculationStore';
import {SptMaterialStore} from './SptMaterialStore';

export const SptStore = types
    .model('SptStore', {
        current: SptCurrentStore,
        sptCalculationStore: SptCalculationStore,
        sptGoodStore: SptGoodStore,
        sptMaterialStore: SptMaterialStore,
        sptUserStore: SptUserStore
    });

export type ISptStore = Instance<typeof SptStore>;