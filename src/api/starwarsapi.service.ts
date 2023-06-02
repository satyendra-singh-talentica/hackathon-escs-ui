import axios, { type AxiosResponse } from 'axios';

class StarWarsApiService {

    getPlanets(pageNumber: number): Promise<any> {
        return this.get(`/planets?page=${pageNumber}`);
    }

    private get(endpoint: string) {
        const baseUrl = 'https://swapi.dev/api';
        return axios.get(`${baseUrl}${endpoint}`).then((value: AxiosResponse) => value.data).catch((reason) => {
            let message = 'Network failure';
            if (reason.response && reason.response.message) {
                message = reason.response.message;
            }
            console.error(`${message} ${endpoint}`);
        });
    }
}

const swapi = new StarWarsApiService();
export const useStarWarsApiService = () => swapi;
