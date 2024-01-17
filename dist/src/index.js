"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserInfo = exports.app = void 0;
// src/index.ts
const express_1 = __importDefault(require("express"));
exports.app = (0, express_1.default)();
const port = 3000;
exports.app.get('/api/user/:userId', async (req, res) => {
    const userId = req.params.userId;
    const userInfo = getUserInfo(userId);
    res.json(userInfo);
});
exports.app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
function getUserInfo(userId) {
    return { userId, name: 'John Doe', email: 'john.doe@example.com' };
}
exports.getUserInfo = getUserInfo;
