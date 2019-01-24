import axios, {AxiosError, AxiosInstance, AxiosResponse} from 'axios';

export default class RestClient {
    private axiosRest: AxiosInstance;

    constructor(uuid: string) {
        this.axiosRest = axios.create({
            headers: {
                'UUID': uuid
            },
            timeout: 2000,
        });
    }

    public get(
        path: string,
        successed: (response: AxiosResponse) => void,
        errored: (error: AxiosError) => void
    ) {
        return this.axiosRest
            .get(path)
            .then((result: AxiosResponse) => {
                global.console.log(`GET ${path}`);
                global.console.log(`result: ${JSON.stringify(result)};`);
                successed(result);
            })
            .catch((error: AxiosError) => {
                global.console.log(`ERROR! GET  ${path}`);
                global.console.log(`error: ${JSON.stringify(error)};`);
                errored(error);
            });
    }

    public post(
        path: string,
        data: object,
        successed: (response: AxiosResponse) => void,
        errored: (error: AxiosError) => void
    ) {
        return this.axiosRest
            .post(path, data)
            .then((result: AxiosResponse) => {
                global.console.log(`POST ${path}`);
                global.console.log(`result: ${JSON.stringify(result)}`);
                successed(result);
            })
            .catch((error: AxiosError) => {
                global.console.log(`ERROR! POST ${path}`);
                global.console.log(`error: ${JSON.stringify(error)}`);
                errored(error);
            });
    }

    public delete(
        path: string,
        successed: (response: AxiosResponse) => void,
        errored: (error: AxiosError) => void
    ) {
        return this.axiosRest
            .delete(path)
            .then((result: AxiosResponse) => {
                global.console.log(`DELETE ${path}`);
                global.console.log(`result: ${JSON.stringify(result)}`);
                successed(result);
            })
            .catch((error: AxiosError) => {
                global.console.log(`ERROR! DELETE ${path}`);
                global.console.log(`error: ${JSON.stringify(error)}`);
                errored(error);
            });
    }

    public put(
        path: string,
        data: object,
        successed: (response: AxiosResponse) => void,
        errored: (error: AxiosError) => void
    ) {
        return this.axiosRest
            .put(path, data)
            .then((result: AxiosResponse) => {
                global.console.log(`PUT ${path}`);
                global.console.log(`result: ${JSON.stringify(result)}`);
                successed(result);
            })
            .catch((error: AxiosError) => {
                global.console.log(`ERROR! PUT ${path}`);
                global.console.log(`error: ${JSON.stringify(error)}`);
                errored(error);
            });
    }
}