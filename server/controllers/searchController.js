import User from '../models/User.js';
import { generateEmbedding as ge } from '../services/bedrockService.js';
import asyncHandler from 'express-async-handler';

export const searchCreatives = asyncHandler(async (req, res) => {
    const { query } = req.body;
    if (!query) { res.status(400); throw new Error('Search query is required.'); }
    try {
        const queryEmbedding = await ge(query);
        const results = await User.aggregate([
            {
                $vectorSearch: {
                index: 'profile_embedding_index',
                path: 'profileEmbedding',
                queryVector: queryEmbedding,
                numCandidates: 100,
                limit: 10
                }
            },
            {
                $project: {
                _id: 1,
                name: 1,
                headline: 1,
                description: 1,
                skills: 1,
                score: { $meta: 'vectorSearchScore' }
                }
            }
        ]);
        res.json(results);
    } catch (error) {
        res.status(500); throw new Error('Failed to perform semantic search.');
    }
});
