import axiosInstance from "../config/axios.js";
import { generateToken } from "../config/jwt.js";

export const generateQuest = async (userId, type) => {
    try {
        const response = await axiosInstance.post(`/quests/generate`, {
            type: type,
        }, {
            headers: {
                'Authorization': `Bearer ${generateToken(userId)}`
            }
        })
        return response.data;
    } catch (error) {
        return false;
    }
}

export const acceptQuest = async (userId, questId) => {
    try {
        const response = await axiosInstance.post(`/quests/${questId}/accept`, {
            headers: {
                'Authorization': `Bearer ${generateToken(userId)}`
            }
        });
        return response.data;
    } catch (error) {
        return false;
    }
}

export const updateStatusQuest = async (userId, questId, status) => {
    try {
        const response = await axiosInstance.put(`/quests/${questId}/status`, {
            status: status
        }, {
            headers: {
                'Authorization': `Bearer ${generateToken(userId)}`
            }
        })
        return response.data;
    } catch (error) {
        return false;
    }
}

export const detailQuest = async (userId, questId) => {
    try {
        const response = await axiosInstance.get(`/quests/${questId}`, {
            headers: {
                'Authorization': `Bearer ${generateToken(userId)}`
            }
        });
        return response.data;
    } catch (error) {
        return false;
    }
}