import {/*AxiosError, */AxiosResponse} from 'axios';
import RestClient from './RestClient';
import {ISptStore} from '../models/SptStore';

const baseUrl: string = 'http://localhost:8080';
const getAll: string = 'goods/';

export interface ISptGoodService {
    getGoods: () => void;
}

export class SptGoodService implements ISptGoodService {

    private restClient: RestClient;
    private sptStore: ISptStore;

    constructor(sptStore: ISptStore) {
        this.restClient = new RestClient(baseUrl);
        this.sptStore = sptStore;
    }

    public getGoods() {
        this.sptStore.sptGoodStore.setLoading(true);
        const path: string = baseUrl.concat(getAll);
        return this.restClient.get(path,
            (response) => this.parseData(response),
            (error) => error,
            () => {
                this.sptStore.sptGoodStore.setLoading(false);
            });
    }

    public parseData(response: AxiosResponse) {
        const resp: string = JSON.stringify(response);
        this.sptStore.sptGoodStore.setGoodName(resp);
    }
}
