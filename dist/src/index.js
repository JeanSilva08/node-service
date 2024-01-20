"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./db");
const userController_1 = __importDefault(require("./controllers/userController"));
const userModel_1 = require("./models/userModel");
const dotenv_1 = __importDefault(require("dotenv"));
const authMiddleware_1 = require("./middleware/authMiddleware"); // Import the auth middleware
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
// Apply basic authentication middleware for all routes under '/api'
app.use('/api', authMiddleware_1.basicAuth);
// Create UserRepository instance with the pool
const userRepository = new userModel_1.UserRepository(db_1.pool);
// Create UserController with the UserRepository
const userController = (0, userController_1.default)(userRepository);
// Use the userController for routes starting with '/api'
app.use('/api', userController);
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
