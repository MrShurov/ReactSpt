import RestClient from './RestClient';
import {ISptStore} from '../models/SptStore';
import {AxiosResponse} from 'axios';
import {Good} from '../models/SptGoodStore';
import {SptParserService} from './SptParserService';

export interface ISptGoodService {
    getGoods: () => void;
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
        const requestUrl = '/goods/';
        return this.restClient.get(requestUrl,
            (response) => {
                this.parseData(response, this.sptStore);
            },
            (error) => error);
    }

    private parseData(response: AxiosResponse, sptStore: ISptStore) {
        const goodName : string = 'goodName';
        const description : string = 'description';
        const imageUrl : string = 'imageUrl';
        const calculationUrl : string = 'calculationUrl';
        const type : string = 'type';
        JSON.stringify(response.data, (key, value) => {
            this.sptParserService.parseArrayOrValue(value, (item: object) => {
                this.sptStore.sptGoodStore.add(Good.create({calculationUrl: item[calculationUrl],
                    description : item[description],goodName : item[goodName],
                    imageUrl : item[imageUrl], type : item[type]}));
            });
            return value;
        });
    }
}
