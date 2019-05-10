import RestClient from './RestClient';
import {ISptStore} from '../models/SptStore';
import {AxiosResponse} from 'axios';
import {User} from '../models/SptUserStore';
import {SptParserService} from './SptParserService';

export interface ISptUserService {
    getUsers: () => void;
    createUser: (data: FormData) => void;
}

export class SptUserService implements ISptUserService {

    private restClient: RestClient;
    private sptStore: ISptStore;
    private sptParserService: SptParserService;

    constructor(sptStore: ISptStore) {
        this.restClient = new RestClient(sptStore.current.currentUser);
        this.sptStore = sptStore;
        this.sptParserService = new SptParserService();
    }

    public getUsers() {
        const requestUrl = 'http://134.209.244.219:8080/spt/user/getAll';
        return this.restClient.get(requestUrl,
            (response) => {
                this.parseData(response, this.sptStore);
            },
            (error) => error);
    }

    public createUser(data: FormData) {
        const requestUrl = 'http://134.209.244.219:8080/spt/user';
        return this.restClient.post(requestUrl, data,
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
        const uuid: string = 'uuid';
        const email: string = 'email';
        JSON.stringify(response.data, (key, value) => {
            this.sptParserService.parseArrayOrValue(value, (item: object) => {
                this.sptStore.sptUserStore.add(User.create({
                    bankRequisites: item[bankRequisites],
                    companyName: item[companyName],
                    email : item[email],
                    password: item[password],
                    paymentAccount: item[paymentAccount],
                    postCode: item[postCode],
                    roles: item[roles],
                    tel: item[tel],
                    unp: item[unp],
                    userid: item[userid],
                    username: item[username],
                    uuid: item[uuid]
                }));
            });
            return value;
        });
    }
}