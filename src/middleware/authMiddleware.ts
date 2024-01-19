// authMiddleware.ts
import { Request, Response, NextFunction } from 'express';

export const basicAuth = (req: Request, res: Response, next: NextFunction) => {
  // Implement your basic authentication logic here
  // Example: Check username and password in headers
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const base64Credentials = authHeader.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');
  const [username, password] = credentials.split(':');

  // Example: Check if username and password are valid
  // Replace this with your actual authentication logic

  if (username === 'your_username' && password === 'your_password') {
    next();
  } else {
    return res.status(401).json({ error: 'Unauthorized' });
  }
};
