import asyncHandler from 'express-async-handler';
import { getChatbotResponse } from '../services/bedrockService.js';

// @desc    Get a response from the chatbot
// @route   POST /api/chatbot
// @access  Private
export const getChatResponse = asyncHandler(async (req, res) => {
    const { prompt, history } = req.body;

    if (!prompt) {
        res.status(400);
        throw new Error('Prompt is required');
    }

    try {
        const response = await getChatbotResponse(prompt, history);
        res.json({ response });
    } catch (error) {
        res.status(500);
        throw new Error('Failed to get response from chatbot');
    }
});
