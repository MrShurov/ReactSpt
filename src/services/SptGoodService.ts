import RestClient from './RestClient';
import {ISptStore} from '../models/SptStore';
import {AxiosResponse} from 'axios';
import {Good} from '../models/SptGoodStore';
import {SptParserService} from './SptParserService';

export interface ISptGoodService {
    getGoods: () => void;
    updateCoefficient: (coefficient : number, materialName: string) => void;
}

export class SptGoodService implements ISptGoodService {

    private restClient: RestClient;
    private sptStore: ISptStore;
    private sptParserService: SptParserService;

    constructor(sptStore: ISptStore) {
        this.restClient = new RestClient(sptStore.current.currentUser);
        this.sptStore = sptStore;
        this.sptParserService = new SptParserService();
    }

    public getGoods() {
        const requestUrl = 'http://134.209.244.219:8080/spt/goods/';
        return this.restClient.get(requestUrl,
            (response) => {
                this.parseData(response, this.sptStore);
            },
            (error) => error);
    }

    public updateCoefficient(coefficient: number, goodName: string){
        const requestUrl = 'http://134.209.244.219:8080/spt/goods/updateCoefficient?coefficient=' + coefficient + '&goodName=' + goodName;
        this.restClient.put(requestUrl,
            (response) => {
                this.parseAndUpdateData(response,this.sptStore);
            },
            (error) => {global.console.log(error);});
    }

    private parseData(response: AxiosResponse, sptStore: ISptStore) {
        const goodName : string = 'goodName';
        const description : string = 'description';
        const imageUrl : string = 'imageUrl';
        const calculationUrl : string = 'calculationUrl';
        const type : string = 'type';
        const coefficient : string = 'coefficient';
        JSON.stringify(response.data, (key, value) => {
            this.sptParserService.parseArrayOrValue(value, (item: object) => {
                this.sptStore.sptGoodStore.add(Good.create({calculationUrl: 'http://134.209.244.219:8080/spt' + item[calculationUrl],
                    coefficient : item[coefficient],description : item[description],goodName : item[goodName],
                    imageUrl : item[imageUrl], type : item[type]}));
            });
            return value;
        });
    }

    private parseAndUpdateData(response: AxiosResponse, sptStore: ISptStore) {
        const goodName : string = 'goodName';
        const coefficient : string = 'coefficient';
        JSON.stringify(response.data, (key, value) => {
            this.sptParserService.parseArrayOrValue(value, (item: object) => {
                this.sptStore.sptMaterialStore.update(item[goodName],item[coefficient]);
            });
            return value;
        });
    }
}
