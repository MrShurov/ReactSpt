import {/*AxiosError, */AxiosResponse} from 'axios';
import RestClient from './RestClient';
import {ISptStore} from '../models/SptStore';
import {Good} from '../models/Good';

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
        this.sptStore.sptGoodStore.setLoading(true);
        const requestUrl = '/goods/';
        return this.restClient.get(requestUrl,
            (response) => response,
            (error) => error);
    }

    public parseData(response: AxiosResponse) {
        const good = Good.create({
            goodName: JSON.stringify(response)
        });
        this.sptStore.sptGoodStore.add(good);
    }
}
