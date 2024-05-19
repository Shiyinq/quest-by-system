import axios from "axios";
import { BASE_URL_BACKEND } from "./index.js";
import { logger } from "./logger.js";

const axiosInstance = axios.create({
    baseURL: `${BASE_URL_BACKEND}/api`,
    timeout: 120000,
    headers: {
        "Content-Type": "application/json",
    }
});


axiosInstance.interceptors.response.use(
    (response) => {
        logger.info("Response received: %o", response.data);
        return response;
    },
    (error) => {
        if (error.response) {
            switch (error.response.status) {
                case 400:
                    logger.error("Bad Request: %o ", error.response.data);
                    break;
                case 401:
                    logger.error("Unauthorized: %o ", error.response.data);
                    break;
                case 403:
                    logger.error("Forbidden: %o ", error.response.data);
                    break;
                case 404:
                    logger.error("Not Found: %o ", error.response.data);
                    break;
                case 500:
                    logger.error("Internal Server Error: %o ", error.response.data);
                    break;
                default:
                    logger.error("Error: %o ", error.response.data);
            }
        } else if (error.request) {
            logger.error("No response received: %o ", error.request);
        } else {
            logger.error("Error setting up request: %o ", error.message);
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;