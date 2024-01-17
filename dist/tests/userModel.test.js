"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userModel_1 = require("../src/models/userModel");
test('Should connect to the database', async () => {
    const result = await (0, userModel_1.getUserInfo)();
    expect(result).toBeDefined();
});
