import express from 'express';
import cors from 'cors';
import characterRoutes from './routes/CharactersRoutes.js';
import helmetMiddleware from './middlewares/helmet.js';
import { errorHandler } from './middlewares/errorhandler.js';

const app = express();
app.use(cors());

app.use(helmetMiddleware);

app.set('json spaces', 2);
app.use(express.json());
app.use('/characters', characterRoutes);

app.use(errorHandler);

export default app;
