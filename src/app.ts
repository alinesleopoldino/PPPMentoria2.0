import cors from 'cors';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { swaggerDocument } from './config/swagger';
import { routes } from './routes';
import { errorHandler } from './shared/middlewares/errorHandler';

export const app = express();

app.use(cors());
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(routes);
app.use(errorHandler);
