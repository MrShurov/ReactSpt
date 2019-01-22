import {Instance, types} from 'mobx-state-tree';

export const Material = types.model({
    materialId : types.number,
    materialName : types.string,
    measure : types.string,
    price : types.number
});

export type Material = Instance<typeof Material>;

export const SptMaterialStore = types
    .model('SptMaterialStore', {
        materials: types.optional(types.array(Material),[]),
    })
    .actions(self => ({
        add(material : Material) {
            const foundItem = self.materials.find(i => i.materialId === material.materialId);
            if (!foundItem) {
                self.materials.push(material);
            }
        },
        update(materialName : string, price : number){
            const foundItem = self.materials.find(i => i.materialName === materialName);
            if (foundItem) {
                self.materials.remove(foundItem);
                foundItem.price = price;
                self.materials.push(foundItem);
            }
        }
    }));

export type ISptMaterialStore = Instance<typeof SptMaterialStore>;