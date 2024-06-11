import dotenv from 'dotenv';
dotenv.config();

export const {
    BOT_TOKEN,
    BASE_URL_BACKEND,
    SECRET_KEY,
    ALGORITHM,
    TOKEN_EXPIRE
} = process.env;