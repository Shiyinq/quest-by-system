import axios from "axios";
import { BASE_URL_BACKEND } from "../config/index.js";

export const userRegister = async (userId, name) => {
    try {
        const response = await axios.post(`${BASE_URL_BACKEND}/api/users/register`, {
            userId: userId,
            name: name,
            source: "telegram"
        })
        return response.data;
    } catch (error) {
        console.log(error.response.status);
        return false;
    }
}

export const setUserGoal = async (userId, goal) => {
    try {
        const response = await axios.post(`${BASE_URL_BACKEND}/api/users/${userId}/goal`, {
            goal: goal
        })
        return response.data;
    } catch (error) {
        console.log(error.response.status);
        return false;
    }
}

export const userDetail = async (userId) => {
    try {
        const response = await axios.get(`${BASE_URL_BACKEND}/api/users/${userId}/detail`);
        return response.data;
    } catch (error) {
        console.log(error.response.status);
        if (error.response.status == 404) {
            return 404;
        }
        return false;
    }
}

export const userQuestHistory = async (userId, type = "all", status = null, page = 1, limit = 8) => {
    try {
        const response = await axios.get(`${BASE_URL_BACKEND}/api/users/${userId}/quests/history?type=${type}&status=${status}&page=${page}&limit=${limit}`);
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
