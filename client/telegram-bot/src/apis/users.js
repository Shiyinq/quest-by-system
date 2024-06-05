import axiosInstance from "../config/axios.js";

export const userRegister = async (userId, name) => {
    try {
        const response = await axiosInstance.post(`/users/register`, {
            userId: userId,
            name: name,
            source: "telegram"
        })
        return response.data;
    } catch (error) {
        return false;
    }
}

export const setUserGoal = async (userId, goal) => {
    try {
        const response = await axiosInstance.put(`/users/${userId}/goal`, {
            goal: goal
        })
        return response.data;
    } catch (error) {
        return false;
    }
}

export const userDetail = async (userId) => {
    try {
        const response = await axiosInstance.get(`/users/${userId}`);
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
        const response = await axiosInstance.get(`/users/${userId}/quests/history?type=${type}&status=${status}&page=${page}&limit=${limit}`);
        return response.data;
    } catch (error) {
        return false;
    }
}

export const userQuestStats = async (userId) => {
    try {
        const response = await axiosInstance.get(`/users/${userId}/quests/stats`);
        return response.data;
    } catch (error) {
        return false;
    }
}
