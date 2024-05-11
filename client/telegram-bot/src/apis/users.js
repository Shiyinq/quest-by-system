import axios from "axios";
import { BASE_URL_BACKEND } from "../config/index.js";

export const userQuestHistory = async (userId, type = "all", page = 1, limit = 8) => {
    try {
        const response = await axios.get(`${BASE_URL_BACKEND}/api/users/${userId}/quests/history?type=${type}&page=${page}&limit=${limit}`);
        return response.data;
    } catch (error) {
        console.log(error.response.status);
        return false;
    }
}

export const userQuestStats = async (userId) => {
    try {
        const response = await axios.get(`${BASE_URL_BACKEND}/api/users/${userId}/quests/stats`);
        return response.data;
    } catch (error) {
        console.log(error.response.status);
        return false;
    }
}
