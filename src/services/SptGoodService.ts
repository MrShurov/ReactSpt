import {/*AxiosError, */AxiosResponse} from 'axios';
import RestClient from './RestClient';
import {ISptStore} from '../models/SptStore';

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
            (response) => {global.console.log(JSON.stringify(response.data));
                this.parseData(response, this.sptStore);},
            (error) => error);
    }

    private parseData(response: AxiosResponse, sptStore : ISptStore) {
        JSON.stringify(response, (key, value) => {
            this.sptStore.sptGoodStore.add(value);
        });
    }
}
