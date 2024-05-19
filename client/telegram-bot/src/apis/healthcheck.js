import axiosInstance from "../config/axios.js";

export const healthCheck = async () => {
    try {
        const response = await axiosInstance.get(`/healthcheck`);
        return response.data;
    } catch (error) {
        console.log(error.response.status);
        return false;
    }
}