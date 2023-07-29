import axios from 'axios';

class ApiService {

    baseUrl = 'http://localhost:9000';
    
    getUser(userId) {
        return this.get(`/users/${userId}`);
    }

    getUserByEmail(email) {
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

    createProject(data) {
        return this.post('/projects', data);
    }

    createHp(data) {
        return this.post('/hps', data);
    }

    getHp(id) {
        return this.get(`/hps/${id}`);
    }

    getHps(userId) {
        return this.get(`/hps?userId=${userId}`);
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

    post(endpoint, data) {
        return axios.post(`${this.baseUrl}${endpoint}`, data).then((value) => value.data).catch((reason) => {
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
