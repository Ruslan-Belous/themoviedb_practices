import axios from 'axios'
import APIconfig from '../APIconfig';

const axiosInstance = axios.create({
    baseURL: `https://api.themoviedb.org/3/`,
})

axiosInstance.interceptors.request.use((config) => {
    let myParams = {
        api_key: APIconfig.apiKey
    }
    config.params = {
        ...config.params,
        ...myParams
    }
    return config;
});

export default axiosInstance