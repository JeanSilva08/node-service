// validateRequestMiddleware.ts
import { Request, Response, NextFunction } from 'express';

export const validateUserEditRequest = (req: Request, res: Response, next: NextFunction) => {
  // Implement your request validation logic here
  // Example: Check if the request body has required fields

  const { username, email } = req.body;

  if (!username || !email) {
    return res.status(400).json({ error: 'Invalid request body' });
  }

  next();
};
