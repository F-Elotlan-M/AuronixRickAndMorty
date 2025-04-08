import express from 'express';
import { getAliveCharacters, getAliveCharactersByPage } from '../controllers/CharactersController.js';
import { validatePageQuery } from '../middlewares/validatePageQuery.js';

const router = express.Router();

router.get('/alive', getAliveCharacters);
router.get('/alive/paged', validatePageQuery, getAliveCharactersByPage);


export default router;
