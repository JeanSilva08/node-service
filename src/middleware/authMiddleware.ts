import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';

class UnauthorizedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UnauthorizedError';
  }
}

const basicAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const authCredentials = Buffer.from(authHeader.split(' ')[1], 'base64').toString('utf-8');
    const [username, password] = authCredentials.split(':');

    // Replace this check with your actual authentication logic
    if (authenticateUser(username, password)) {
      return next(); // Authorized
    }
  }

  res.status(401).json({ error: 'Unauthorized' });
};

const authenticateUser = (username: string, password: string): boolean => {
  // Replace this with your actual authentication logic
  const storedPasswordHash = 'hashed_password'; // Fetch hashed password from a secure storage

  const inputPasswordHash = crypto.createHash('sha256').update(password).digest('hex');

  return storedPasswordHash === inputPasswordHash;
};

export default basicAuth;
