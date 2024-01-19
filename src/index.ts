import express from 'express';
import { pool } from './db';
import UserController from './controllers/userController';
import { UserRepository } from './models/userModel';
import dotenv from 'dotenv';
dotenv.config();


const app = express();
const port = 3000;

app.use(express.json());

// Create UserRepository instance with the pool
const userRepository = new UserRepository(pool);

// Create UserController with the UserRepository
const userController = UserController(userRepository);

// Use the userController for routes starting with '/api'
app.use('/api', userController);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
