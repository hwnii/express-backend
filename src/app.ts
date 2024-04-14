import express from 'express';
import controllers from './contexts/index.controller';
import bodyParser, { json } from 'body-parser';
import { errorMiddleware } from './middlewares/error.middleware';

const app = express();
const PORT = 5050;
const jsonParser = bodyParser.json();

app.use(jsonParser);
app.use(controllers);
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`서버 실행: ${PORT}`);
});
