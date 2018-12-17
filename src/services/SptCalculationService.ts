import RestClient from './RestClient';
import {ISptStore} from '../models/SptStore';
import {AxiosResponse} from 'axios';
import {SptParserService} from './SptParserService';


export interface ISptCalculationService {
    calculate: (data: FormData, calculationUrl: string) => void;
}

export class SptCalculationService implements ISptCalculationService {

    private restClient: RestClient;
    private sptStore: ISptStore;
    private sptParserService: SptParserService;

    constructor(sptStore: ISptStore) {
        this.restClient = new RestClient();
        this.sptStore = sptStore;
        this.sptParserService = new SptParserService();
    }

    public calculate(data: FormData, calculationUrl: string) {
        return this.restClient.post(calculationUrl,
            data,
            (response => this.parseData(response, this.sptStore)),
            error => global.console.log(error));
    }

    private parseData(response: AxiosResponse, sptStore: ISptStore) {
        JSON.stringify(response.data, (key, value) => {
                if (key.toString() === ('price')) {
                    this.sptParserService.parseArrayOrValue(value, (item: object) => {
                            this.sptStore.sptCalculationStore.setPrice(Number(item));
                        }
                    );
                    return value;
                }
                return value;
            }
        );
    }
}