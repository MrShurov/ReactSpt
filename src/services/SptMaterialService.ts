import RestClient from './RestClient';
import {ISptStore} from '../models/SptStore';
import {SptParserService} from './SptParserService';
import {AxiosResponse} from 'axios';
import {Material} from '../models/SptMaterialStore';

export interface ISptMaterialService {
    getMaterial: () => void;
    updateMaterial: (price : number, materialName : string) => void;
}

export class SptMaterialService implements ISptMaterialService {

    private restClient: RestClient;
    private sptStore: ISptStore;
    private sptParserService: SptParserService;

    constructor(sptStore: ISptStore) {
        this.restClient = new RestClient(sptStore.current.currentUser);
        this.sptStore = sptStore;
        this.sptParserService = new SptParserService();
    }

    public updateMaterial(price : number, materialName : string) {
        const requestUrl = '/material?materialName=' + materialName + '&price=' + price;
        this.restClient.put(requestUrl,
            (response) => {
                this.parseAndUpdateData(response,this.sptStore);
            },
            (error) => {global.console.log(error);});
    }

    public getMaterial() {
        const requestUrl = '/material';
        return this.restClient.get(requestUrl,
            (response) => {
                this.parseData(response, this.sptStore);
            },
            (error) => error);
    }

    private parseData(response: AxiosResponse, sptStore: ISptStore) {
        const materialId : string = 'materialId';
        const measures : string = 'measures';
        const materialName : string = 'materialName';
        const price : string = 'price';
        const measureName : string = 'measureName';
        JSON.stringify(response.data, (key, value) => {
            this.sptParserService.parseArrayOrValue(value, (item: object) => {
                this.sptStore.sptMaterialStore.add(Material.create({
                    materialId : item[materialId],
                    materialName : item[materialName],
                    measure : item[measures][measureName],
                    price : item[price]
                }));
            });
            return value;
        });
    }

    private parseAndUpdateData(response: AxiosResponse, sptStore: ISptStore) {
        const materialName : string = 'materialName';
        const price : string = 'price';
        JSON.stringify(response.data, (key, value) => {
            this.sptParserService.parseArrayOrValue(value, (item: object) => {
                this.sptStore.sptMaterialStore.update(item[materialName],item[price]);
            });
            return value;
        });
    }
}
