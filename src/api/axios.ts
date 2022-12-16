import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://reactnd-books-api.udacity.com'
});

axiosInstance.interceptors.response.use(
    (res) => res.data,
    error => Promise.resolve([])
);

export default axiosInstance;