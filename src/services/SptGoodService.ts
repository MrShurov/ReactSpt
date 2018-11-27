import RestClient from './RestClient';
import {ISptStore} from '../models/SptStore';
import {AxiosResponse} from 'axios';
import {Good} from '../models/SptGoodStore';

export interface ISptGoodService {
    getGoods: () => void;
}

export class SptGoodService implements ISptGoodService {

    private restClient: RestClient;
    private sptStore: ISptStore;

    constructor(sptStore: ISptStore) {
        this.restClient = new RestClient();
        this.sptStore = sptStore;
    }

    public getGoods() {
        const requestUrl = '/goods/';
        return this.restClient.get(requestUrl,
            (response) => {
                this.parseData(response, this.sptStore);
            },
            (error) => error);
    }

    protected parseArrayOrValue(value: object, fn: (item: object) => void) {
        const array: object[] = value instanceof Array ? value : [value];
        array.forEach((item) => fn(item));
    }

    private parseData(response: AxiosResponse, sptStore: ISptStore) {
        const goodName : string = 'goodName';
        const description : string = 'description';
        const imageUrl : string = 'imageUrl';
        JSON.stringify(response.data, (key, value) => {
            this.parseArrayOrValue(value, (item: object) => {
                this.sptStore.sptGoodStore.add(Good.create({goodName : item[goodName],description : item[description],imageUrl : item[imageUrl]}));
            });
            return value;
        });
    }
}
