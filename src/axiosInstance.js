import axios from 'axios';


const instance = axios.create({
    baseURL: 'http://localhost:3002/api/',
});

axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');
    let headersConfig = {
        ...config,
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }
    return headersConfig;
}, function (error) {
    console.log(error)
    return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});