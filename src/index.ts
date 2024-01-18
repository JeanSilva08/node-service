import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();

interface User {
  userId: string;
  name: string;
  email: string;
}

export const app = express();
const port = 3000;

app.use(express.json());

const userDatabase: { [key: string]: User } = {
  'validuser': { userId: 'validuser', name: 'John Doe', email: 'john.doe@example.com' },

};


app.get('/api/user/:userId', async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const userInfo = getUserInfo(userId);

  if (userInfo !== null && userInfo !== undefined) {
    res.json(userInfo);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});


app.put('/api/user/:userId', async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const updatedUserInfo = req.body as Partial<User>;
  const success = editUserInfo(userId, updatedUserInfo);

  if (success) {
    res.json({ message: 'User information updated successfully' });
  } else {
    res.status(404).json({ error: 'User not found or update failed' });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

export function getUserInfo(userId: string): User | null {
  const userInfo = userDatabase[userId];

  if (userInfo !== undefined) {
    return userInfo;
  } else {
    return null;
  }
}

export function editUserInfo(userId: string, updatedUserInfo: Partial<User>): boolean {
  if (userDatabase[userId] !== undefined) {
    userDatabase[userId] = {
      ...userDatabase[userId],
      name: updatedUserInfo.name || '', // Use empty string as default
      email: updatedUserInfo.email || '', // Use empty string as default
    };
  } else {
    userDatabase[userId] = {
      userId,
      name: updatedUserInfo.name || '', // Use empty string as default
      email: updatedUserInfo.email || '', // Use empty string as default
    };
  }

  return true;
}


