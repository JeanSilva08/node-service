"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BASE_URL = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors")); // Add this line
const db_1 = require("./db");
const userController_1 = __importDefault(require("./controllers/userController"));
const userModel_1 = require("./models/userModel");
const dotenv_1 = __importDefault(require("dotenv"));
const authMiddleware_1 = require("./middleware/authMiddleware");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 3000;
// Enable CORS for all routes
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api', authMiddleware_1.basicAuth);
const userRepository = new userModel_1.UserRepository(db_1.pool);
const userController = (0, userController_1.default)(userRepository);
// Handle preflight OPTIONS for all routes
app.options('*', (0, cors_1.default)());
// Specify allowed headers
app.use((0, cors_1.default)({ origin: 'http://localhost:3001', allowedHeaders: ['Authorization', 'Content-Type'] }));
app.use('/api', userController);
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
exports.BASE_URL = 'http://localhost:3000/api';
