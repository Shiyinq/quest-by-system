import axios from "axios";
import {BASE_URL_BACKEND} from "../config/index.js";

export const generateQuest = async (userId, type) => {
    try {
        const response = await axios.post(`${BASE_URL_BACKEND}/api/quests/generate`, {
            userId: userId,
            type: type,
        })
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

export const detailQuest = async (questId) => {
    try {
        const response = await axios.get(`${BASE_URL_BACKEND}/api/quests/${questId}`);
        return response.data;
    } catch (error) {
        console.log(error.response.status);
        return false;
    }
}