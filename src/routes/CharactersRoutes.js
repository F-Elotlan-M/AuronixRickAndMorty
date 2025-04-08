import express from 'express';
import { getAliveCharacters, getAliveCharactersByPage } from '../controllers/CharactersController.js';
import { validatePageNumber } from '../middlewares/validatePageNumber.js';

const router = express.Router();

router.get('/alive', getAliveCharacters);
router.get('/alive/page/:pageNumber', validatePageNumber, getAliveCharactersByPage);


export default router;
