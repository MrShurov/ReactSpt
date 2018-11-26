import RestClient from './RestClient';
import {ISptStore} from '../models/SptStore';
import {AxiosResponse} from 'axios';

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
        JSON.stringify(response.data, (key, value) => {
            this.parseArrayOrValue(value, (item: object) => {
                const s = item.toString();
                if (s === '[object Object]') {
                    {
                        global.console.log();
                    }
                } else {
                    return this.sptStore.sptGoodStore.add(item.toString());
                }
            });
            return value;
        });
    }
}
