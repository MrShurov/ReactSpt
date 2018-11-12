import RestClient from './RestClient';

const baseUrl: string = 'http://localhost:8080/login';

export interface ISptLoginService {
    login: () => void;
}

export class SptLoginService implements ISptLoginService {

    private restClient: RestClient;

    constructor() {
        this.restClient = new RestClient(baseUrl);
    }

    public login() {
        const requestUrl = 'http://localhost:8080/login';
        const data = new FormData();
        data.append('username','Shurov');
        data.append('password', 'secret');
        return this.restClient.post(requestUrl,data,
            (response) => response,
            (error) => error);
    }
}