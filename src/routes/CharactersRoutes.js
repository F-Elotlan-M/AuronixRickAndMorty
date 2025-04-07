import express from 'express';
import { getAliveCharacters } from '../controllers/CharactersController.js';

const router = express.Router();

router.get('/alive', getAliveCharacters);

export default router;
