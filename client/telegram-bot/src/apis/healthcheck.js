import axios from "axios";
import { BASE_URL_BACKEND } from "../config/index.js";


export const healthCheck = async () => {
    try {
        const response = await axios.get(`${BASE_URL_BACKEND}/api/healthcheck`);
        return response.data;
    } catch (error) {
        console.log(error.response.status);
        return false;
    }
}