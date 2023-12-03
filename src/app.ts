import express, { Request, Response, Application } from 'express';
import cors from 'cors';
import notFound from './middleweres/notFound';
import globalErrorHandler from './middleweres/globalErrorHandler';
import { studentRouter } from './moduels/student/route.student';
import { userRouter } from './moduels/user/user.route';
import { academicRouter } from './moduels/academicSemester/academicSemester.route';
import { acadFacultyRouter } from './moduels/acadFaculty/acadFaculty.route';
import { departmentRouter } from './moduels/acadDepartment/acadDept.route';

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// Application api
app.use(studentRouter.router);
app.use(acadFacultyRouter)
app.use(departmentRouter)
app.use(academicRouter);
app.use(userRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});


app.use(globalErrorHandler);
app.use(notFound);

export default app;
