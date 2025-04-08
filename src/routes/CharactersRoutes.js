import express from 'express';
import { getAliveCharacters, getAliveCharactersByPage } from '../controllers/CharactersController.js';

const router = express.Router();

router.get('/alive', getAliveCharacters);
router.get('/alive/page/:pageNumber', getAliveCharactersByPage);


export default router;
