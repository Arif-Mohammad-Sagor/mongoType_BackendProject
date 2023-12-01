import express, { Request, Response, Application } from 'express';
import cors from 'cors';
import { studentRouter } from './moduels/student/route.student';
import { userRouter } from './moduels/user/user.route';
import notFound from './middleweres/notFound';
import globalErrorHandler from './middleweres/globalErrorHandler';

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// Application api
app.use(studentRouter.router);
app.use(userRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

// global error handling
app.use(globalErrorHandler);
// not found 
app.use(notFound);

export default app;
