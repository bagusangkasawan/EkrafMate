import express from 'express';
import { searchCreatives } from '../controllers/searchController.js';

const searchRouter = express.Router();

searchRouter.post('/creatives', searchCreatives);

export default searchRouter;
