import axios from "axios";
import {BASE_URL_BACKEND} from "../config/index.js";

export const generateQuest = async (userId, type) => {
    let data = {
        userId: userId,
        type: type,
    }
    try {
        const response = await axios.post(`${BASE_URL_BACKEND}/api/quests/generate`, data)
        return response.data;
    } catch (error) {
        console.log(error.response.status);
        return false;
    }
}

export const acceptQuest = async (questId) => {
    try {
        const response = await axios.post(`${BASE_URL_BACKEND}/api/quests/${questId}/accept`);
        return response.data;
    } catch (error) {
        console.log(error.response.status);
        return false;
    }
}