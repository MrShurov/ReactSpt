import RestClient from './RestClient';


export interface ISptCalculationService {
    calculate: (data : FormData, goodName : string) => void;
}

export class SptCalculationService implements ISptCalculationService {

    private restClient: RestClient;

    constructor() {
        this.restClient = new RestClient();
    }

    public calculate(data : FormData, goodName : string){
        const path = '/calculate/BathDemountable';
        this.restClient.post(path,
            data,
            (response => global.console.log(response)),
            error => global.console.log(error));
    }
}