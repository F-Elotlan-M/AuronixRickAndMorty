import express from 'express';
import characterRoutes from './routes/CharactersRoutes.js';

const app = express();

app.use(express.json());
app.use('/characters', characterRoutes);

export default app;
