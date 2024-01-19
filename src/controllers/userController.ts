import express, { Request, Response, Router } from 'express';
import { UserRepository } from '../models/userModel';
import { validateUserEditRequest } from '../middleware/validateRequestMiddleware';

const UserController = (userRepository: UserRepository): Router => {
  const router = express.Router();

  router.get('/users', async (req: Request, res: Response) => {
    try {
      const users = await userRepository.getAllUsers();
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  router.post('/users', async (req: Request, res: Response) => {
    const { username, email } = req.body;
    try {
      const success = await userRepository.createUser(username, email);
      if (success) {
        res.json({ message: 'User created successfully' });
      } else {
        res.status(400).json({ error: 'Failed to create user' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  // Add other routes as needed

  return router;
};

export default UserController;
