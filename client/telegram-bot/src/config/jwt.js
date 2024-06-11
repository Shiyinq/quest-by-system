import jwt from 'jsonwebtoken';
import { SECRET_KEY, ALGORITHM, TOKEN_EXPIRE } from './index.js';

export const generateToken = (userId) => {
    const secretKey = SECRET_KEY;
    const algorithm = ALGORITHM;
    const tokenExpire = parseInt(TOKEN_EXPIRE, 10);

    const expirationTime = Math.floor(Date.now() / 1000) + (tokenExpire * 60);

    const payload = {
        sub: userId,
        exp: expirationTime
    };

    const options = {
        algorithm: algorithm
    };

    const token = jwt.sign(payload, secretKey, options);

    return token;
};
