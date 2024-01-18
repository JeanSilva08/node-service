// userRoutes.ts

import express from 'express';
import basicAuth from '../middleware/authMiddleware';

const router = express.Router();

// Apply basicAuth middleware to enforce authentication
router.use(basicAuth);

// Existing route handlers...

export default router;
