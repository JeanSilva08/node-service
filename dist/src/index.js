"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
app.get('/api/user/:userId', async (req, res) => {
    const userId = req.params.userId;
    const userInfo = getUserInfo(userId); // Implement this function to retrieve user info
    res.json(userInfo);
});
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
function getUserInfo(userId) {
    return { userId, name: 'John Doe', email: 'john.doe@example.com' };
}
