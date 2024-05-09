import axios from "axios";
import {BASE_URL_BACKEND} from "../config/index.js";

export const userQuestHistory = async (userId, type = "all", page = 1, limit = 8) => {
    try {
        const response = await axios.get(`${BASE_URL_BACKEND}/api/users/${userId}/quests/history?type=${type}&page=${page}&limit=${limit}`);
        return response.data;
    } catch (error) {
        console.log(error.response.status);
        return false;
    }
}

export const detailQuest = async (questId) => {
    try {
        const response = await axios.get(`${BASE_URL_BACKEND}/api/quests/${questId}`);
        return response.data;
    } catch (error) {
        console.log(error.response.status);
        return false;
    }
}