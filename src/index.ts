// src/index.ts
import express, { Request, Response } from 'express';

export const app = express();
const port = 3000;

app.get('/api/user/:userId', async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const userInfo = getUserInfo(userId);
  
    if (userInfo !== null && userInfo !== undefined) {
        res.json(userInfo);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
  });

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

export function getUserInfo(userId: string): any {
    console.log(`Searching for user with ID: ${userId}`);
    
    // Check if the user exists based on your logic
    const user = userId === '1' ? { userId, name: 'John Doe', email: 'john.doe@example.com' } : null;
  
    if (user) {
      console.log(`User found: ${JSON.stringify(user)}`);
    } else {
      console.log('User not found');
    }
  
    return user;
  }