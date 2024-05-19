import axiosInstance from "../config/axios.js";

export const generateQuest = async (userId, type) => {
    try {
        const response = await axiosInstance.post(`/quests/generate`, {
            userId: userId,
            type: type,
        })
        return response.data;
    } catch (error) {
        return false;
    }
}

export const acceptQuest = async (questId) => {
    try {
        const response = await axiosInstance.post(`/quests/${questId}/accept`);
        return response.data;
    } catch (error) {
        return false;
    }
}

export const updateStatusQuest = async (questId, status) => {
    try {
        const response = await axiosInstance.put(`/quests/${questId}/status`, {
            status: status
        })
        return response.data;
    } catch (error) {
        return false;
    }
}

export const detailQuest = async (questId) => {
    try {
        const response = await axiosInstance.get(`/quests/${questId}`);
        return response.data;
    } catch (error) {
        return false;
    }
}