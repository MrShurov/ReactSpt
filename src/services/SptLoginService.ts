import RestClient from './RestClient';

let hasError: boolean;

export interface ISptLoginService {
    login: (form: HTMLFormElement) => boolean;
}

export class SptLoginService implements ISptLoginService {

    private restClient: RestClient;

    constructor() {
        this.restClient = new RestClient();
    }

    public login(form: HTMLFormElement) {
        const requestUrl = '/login';
        const data = new FormData(form);
        this.restClient.post(requestUrl, data,
            (response) => {hasError = false;
                window.location.replace('http://localhost:3000/good');
                },
            (error) => hasError = true);
        return hasError;
    }
}