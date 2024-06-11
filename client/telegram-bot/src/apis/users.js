import axiosInstance from "../config/axios.js";
import { generateToken } from "../config/jwt.js";

export const userSignUp = async (userId, name, username) => {
    try {
        const response = await axiosInstance.post(`/auth/sign-up`, {
            userId: userId,
            name: name,
            username: username,
            source: "telegram"
        })
        return response.data;
    } catch (error) {
        return false;
    }
}

export const setUserGoal = async (userId, goal) => {
    try {
        const response = await axiosInstance.put(`/users/goal`, {
            goal: goal
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

export const userDetail = async (userId) => {
    try {
        const response = await axiosInstance.get(`/users/me`, {
                headers: {
                    'Authorization': `Bearer ${generateToken(userId)}`
                }
            }
        );
        return response.data;
    } catch (error) {
        if (error?.response?.status == 404) {
            return 404;
        }
        return false;
    }
}

export const userQuestHistory = async (userId, type = "all", status = null, page = 1, limit = 8) => {
    try {
        const response = await axiosInstance.get(`/users/quests/history?type=${type}&status=${status}&page=${page}&limit=${limit}`, {
            headers: {
                'Authorization': `Bearer ${generateToken(userId)}`
            }
        });
        return response.data;
    } catch (error) {
        return false;
    }
}

export const userQuestStats = async (userId) => {
    try {
        const response = await axiosInstance.get(`/users/quests/stats`, {
            headers: {
                'Authorization': `Bearer ${generateToken(userId)}`
            }
        });
        return response.data;
    } catch (error) {
        return false;
    }
}
