import express from 'express';
import characterRoutes from './routes/CharactersRoutes.js';

const app = express();

app.set('json spaces', 2);
app.use(express.json());
app.use('/characters', characterRoutes);

export default app;
