import express, { Request, Response, Application } from 'express';
import cors from 'cors';
import { studentRouter } from './moduels/student/route.student';

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// Application api
app.use(studentRouter.router)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;
