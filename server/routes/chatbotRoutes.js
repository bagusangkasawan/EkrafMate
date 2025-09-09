import express from 'express';
import { getChatResponse } from '../controllers/chatbotController.js';
import { protect } from '../middleware/authMiddleware.js';

const chatbotRouter = express.Router();

chatbotRouter.route('/').post(protect, getChatResponse);

export default chatbotRouter;
