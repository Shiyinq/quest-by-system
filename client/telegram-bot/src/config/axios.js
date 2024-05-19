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
        if (error.response) {
            switch (error.response.status) {
                case 400:
                    console.error("Bad Request:", error.response.data);
                    break;
                case 401:
                    console.error("Unauthorized:", error.response.data);
                    break;
                case 403:
                    console.error("Forbidden:", error.response.data);
                    break;
                case 404:
                    console.error("Not Found:", error.response.data);
                    break;
                case 500:
                    console.error("Internal Server Error:", error.response.data);
                    break;
                default:
                    console.error("Error:", error.response.data);
            }
        } else if (error.request) {
            console.error("No response received:", error.request);
        } else {
            console.error("Error setting up request:", error.message);
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;