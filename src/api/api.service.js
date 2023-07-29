import axios from 'axios';

class ApiService {

    baseUrl = 'http://localhost:9000';
        
    getUser(email) {
        return this.get(`/users?email=${email}`);
    }

    getSearch(searchString) {
        return this.get(`/search?q=${searchString}`);
    }

    getProject(id) {
        return this.get(`/projects/${id}`);
    }

    getProjects(userId) {
        return this.get(`/projects?userId=${userId}`);
    }

    get(endpoint) {
        return axios.get(`${this.baseUrl}${endpoint}`).then((value) => value.data).catch((reason) => {
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
