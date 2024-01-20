"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// userRoutes.ts
const express_1 = __importDefault(require("express"));
const userModel_1 = require("../models/userModel");
const authMiddleware_1 = require("../middleware/authMiddleware");
const validateRequestMiddleware_1 = require("../middleware/validateRequestMiddleware");
const db_1 = require("../db"); // Import the pool from db
const router = express_1.default.Router();
const userRepository = new userModel_1.UserRepository(db_1.pool);
// Apply basicAuth middleware to protect these routes
router.use(authMiddleware_1.basicAuth);
router.get('/api/users', async (req, res) => {
    try {
        const users = await userRepository.getAllUsers();
        res.json(users);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
router.post('/api/users', async (req, res) => {
    const { username, email } = req.body;
    try {
        const success = await userRepository.createUser(username, email);
        if (success) {
            res.json({ message: 'User created successfully' });
        }
        else {
            res.status(400).json({ error: 'Failed to create user' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
router.put('/api/user/:userId', validateRequestMiddleware_1.validateUserEditRequest, async (req, res) => {
    const userId = req.params.userId;
    const updatedUserInfo = req.body;
    try {
        const success = await userRepository.updateUser(userId, updatedUserInfo);
        if (success) {
            res.json({ message: 'User information updated successfully' });
        }
        else {
            res.status(404).json({ error: 'User not found or update failed' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.default = router;
