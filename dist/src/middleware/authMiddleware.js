"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.basicAuth = void 0;
const basicAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Basic ')) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');
    const [username, password] = credentials.split(':');
    if (isValidCredentials(username, password)) {
        next();
    }
    else {
        return res.status(401).json({ error: 'Unauthorized' });
    }
};
exports.basicAuth = basicAuth;
const isValidCredentials = (username, password) => {
    return username === 'testuser' && password === 'testpassword';
};
