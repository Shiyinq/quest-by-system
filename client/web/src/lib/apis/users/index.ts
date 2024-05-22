import { QUEBYS_API_BASE_URL } from "$lib/constants";

export const getUserDetail = async (userId: string) => {
    try {
        const response = await fetch(`${QUEBYS_API_BASE_URL}/users/${userId}/detail`);
        const data = await response.json();
        return data
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export const getUserQuestGenerated = async (userId: string, page: number = 1, limit: number = 5) => {
    try {
        const response = await fetch(`${QUEBYS_API_BASE_URL}/users/${userId}/quests/generated?page=${page}&limit=${limit}`);
        const data = await response.json();
        return data
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export const getUserQuestHistory = async (userId: string, type: string = "all", status: string = "null", page: number = 1, limit: number = 5) => {
    try {
        const response = await fetch(`${QUEBYS_API_BASE_URL}/users/${userId}/quests/history?type=${type}&status=${status}&page=${page}&limit=${limit}`);
        const data = await response.json();
        return data
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export const getUserQuestStats = async (userId: string) => {
    try {
        const response = await fetch(`${QUEBYS_API_BASE_URL}/users/${userId}/quests/stats`);
        const data = await response.json();
        return data
    } catch (err) {
        console.log(err);
        throw err;
    }
}