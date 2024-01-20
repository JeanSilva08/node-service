"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
class UserRepository {
    constructor(pool) {
        this.pool = pool;
    }
    async getUserById(userId) {
        try {
            const result = await this.pool.query('SELECT * FROM users WHERE id = $1', [userId]);
            const userInfo = result.rows[0];
            return userInfo || null;
        }
        catch (error) {
            console.error('Error retrieving user:', error);
            throw error;
        }
    }
    async updateUser(userId, updatedUserInfo) {
        try {
            const result = await this.pool.query('UPDATE users SET username = $1, email = $2 WHERE id = $3 RETURNING *', [updatedUserInfo.username, updatedUserInfo.email, userId]);
            return result.rows.length > 0;
        }
        catch (error) {
            console.error('Error updating user:', error);
            throw error;
        }
    }
    async createUser(username, email) {
        try {
            const result = await this.pool.query('INSERT INTO users (username, email) VALUES ($1, $2) RETURNING *', [username, email]);
            return result.rows.length > 0;
        }
        catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    }
    async getAllUsers() {
        try {
            const result = await this.pool.query('SELECT * FROM users');
            return result.rows;
        }
        catch (error) {
            console.error('Error retrieving all users:', error);
            throw error;
        }
    }
}
exports.UserRepository = UserRepository;
exports.default = UserRepository;
