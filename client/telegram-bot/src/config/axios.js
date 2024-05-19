import axios from "axios";
import { BASE_URL_BACKEND } from "./index.js";

const axiosInstance = axios.create({
    baseURL: `${BASE_URL_BACKEND}/api`,
    timeout: 120000,
    headers: {
        "Content-Type": "application/json",
    }
});


axiosInstance.interceptors.response.use(
    (response) => {
        console.log(response.data);
        return response;
    },
    (error) => {
        console.log(error.response);
        return Promise.reject(error);
    }
);

export default axiosInstance;