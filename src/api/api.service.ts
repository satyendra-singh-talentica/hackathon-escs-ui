import axios, { type AxiosResponse } from 'axios';

class ApiService {

    private baseUrl = 'http://localhost:9000';
        
    getUser(email: string): Promise<any> {
        return this.get(`/users?email=${email}`);
    }

    private get(endpoint: string) {
        return axios.get(`${this.baseUrl}${endpoint}`).then((value: AxiosResponse) => value.data).catch((reason) => {
            let message = 'Network failure';
            if (reason.response && reason.response.message) {
                message = reason.response.message;
            }
            console.error(`${message} ${endpoint}`);
        });
    }
}

const api = new ApiService();
export const useApiService = () => api;
