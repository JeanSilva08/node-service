"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserInfo = exports.pool = void 0;
const pg_1 = require("pg");
exports.pool = new pg_1.Pool({
    user: 'service_user',
    host: 'localhost',
    database: 'servicedb',
    password: 'sigma123@',
    port: 5433,
});
const getUserInfo = async () => {
    const result = await exports.pool.query('SELECT * FROM users');
    return result;
};
exports.getUserInfo = getUserInfo;
