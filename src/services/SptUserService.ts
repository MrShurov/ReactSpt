import RestClient from './RestClient';
import {ISptStore} from '../models/SptStore';
import {AxiosResponse} from 'axios';
import {User} from '../models/SptUserStore';
import {SptParserService} from './SptParserService';

export interface ISptUserService {
    getUsers: () => void;
    createUser: (form: HTMLFormElement) => void;
}

export class SptUserService implements ISptUserService {

    private restClient: RestClient;
    private sptStore: ISptStore;
    private sptParserService: SptParserService;

    constructor(sptStore: ISptStore) {
        this.restClient = new RestClient();
        this.sptStore = sptStore;
        this.sptParserService = new SptParserService();
    }

    public getUsers() {
        const requestUrl = '/user/getAll';
        return this.restClient.get(requestUrl,
            (response) => {
                this.parseData(response, this.sptStore);
            },
            (error) => error);
    }

    public createUser(form: HTMLFormElement) {
        const requestUrl = 'http://localhost:8080/user/';
        const data = new FormData(form);
        this.restClient.post(requestUrl, data,
            (response) => {
                this.getUsers();
            },
            (error) => error);
    }

    private parseData(response: AxiosResponse, sptStore: ISptStore) {
        const userid: string = 'userid';
        const username: string = 'username';
        const password: string = 'password';
        const companyName: string = 'companyName';
        const paymentAccount: string = 'paymentAccount';
        const bankRequisites: string = 'bankRequisites';
        const postCode: string = 'postCode';
        const unp: string = 'unp';
        const tel: string = 'tel';
        const roles: string = 'roles';
        JSON.stringify(response.data, (key, value) => {
            this.sptParserService.parseArrayOrValue(value, (item: object) => {
                this.sptStore.sptUserStore.add(User.create({
                    bankRequisites: item[bankRequisites],
                    companyName: item[companyName],
                    password: item[password],
                    paymentAccount: item[paymentAccount],
                    postCode: item[postCode],
                    roles: item[roles],
                    tel: item[tel],
                    unp: item[unp],
                    userid: item[userid],
                    username: item[username]
                }));
            });
            return value;
        });
    }
}