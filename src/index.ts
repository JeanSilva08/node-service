import express from 'express';
import { pool } from './db';
import UserController from './controllers/userController';
import { UserRepository } from './models/userModel';
import dotenv from 'dotenv';
import { basicAuth } from './middleware/authMiddleware'; 
dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());


app.use('/api', basicAuth);


const userRepository = new UserRepository(pool);


const userController = UserController(userRepository);


app.use('/api', userController);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
