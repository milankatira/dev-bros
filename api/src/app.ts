import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import { db } from './config/db';

dotenv.config();
const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();
app.use(helmet());
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use('/api/v1/static', express.static(`${__dirname}/static`));

app.listen(process.env.ENV !== 'test' ? PORT : 0, async () => {
  await db();

  console.log(`Listening on port ${PORT}`);
});

export default app;
