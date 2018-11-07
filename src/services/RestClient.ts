import axios, {AxiosInstance, AxiosResponse, AxiosError} from 'axios';

export default class RestClient {
    private axiosRest: AxiosInstance;
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
        this.axiosRest = axios.create({
            timeout: 2000,
            url: baseUrl,
        });
    }

    public get(
        path: string,
        successed: (response: AxiosResponse) => void,
        errored: (error: AxiosError) => void,
        always: () => void
    ) {
        return this.axiosRest
            .get(path)
            .then((result: AxiosResponse) => {
                global.console.log(`EZ`);
                successed(result);
            })
            .catch((error: AxiosError) => {
                global.console.log(`ERROR! GET ${path}`);
                errored(error);
            })
            .then(() => always());
    }

    public post(
        path: string,
        data: object,
        successed: (response: AxiosResponse) => void,
        errored: (error: AxiosError) => void,
        always: () => void
    ) {
        return this.axiosRest
            .post(path, data)
            .then((result: AxiosResponse) => {
                global.console.log(`POST ${this.baseUrl}/${path}`);
                global.console.log(`result: ${JSON.stringify(result)}`);
                successed(result);
            })
            .catch((error: AxiosError) => {
                global.console.log(`ERROR! POST ${this.baseUrl}/${path}`);
                global.console.log(`error: ${JSON.stringify(error)}`);
                errored(error);
            })
            .then(() => always());
    }

    public delete(
        path: string,
        successed: (response: AxiosResponse) => void,
        errored: (error: AxiosError) => void,
        always: () => void
    ) {
        return this.axiosRest
            .delete(path)
            .then((result: AxiosResponse) => {
                global.console.log(`DELETE ${this.baseUrl}/${path}`);
                global.console.log(`result: ${JSON.stringify(result)}`);
                successed(result);
            })
            .catch((error: AxiosError) => {
                global.console.log(`ERROR! DELETE ${this.baseUrl}/${path}`);
                global.console.log(`error: ${JSON.stringify(error)}`);
                errored(error);
            })
            .then(() => always());
    }
}