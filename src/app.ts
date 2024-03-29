import express, { Request, Response, Application } from 'express';
import cors from 'cors';
import notFound from './middleweres/notFound';
import globalErrorHandler from './middleweres/globalErrorHandler';
import { studentRouter } from './moduels/student/route.student';
import { userRouter } from './moduels/user/user.route';
import { academicRouter } from './moduels/academicSemester/academicSemester.route';
import { acadFacultyRouter } from './moduels/academicFaculty/acadFaculty.route';
import { departmentRouter } from './moduels/academicDepartment/acadDept.route';
import { facultyRotuer } from './moduels/faculty/faculty.route';
import { courseRouter } from './moduels/Course/course.route';
import { academicSemesterRegistrationRoute } from './moduels/AcademicRegistration/academicRegistration.route';
import { offeredCourseRoute } from './moduels/OfferedCourse/offeredCourse.route';
import { AuthRouter } from './moduels/Auth/auth.routes';


const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());
// {origin:'http//:localhost/5173',credentials:true}

// Application api
app.use(studentRouter.router);
app.use(acadFacultyRouter);
app.use(departmentRouter);
app.use(academicRouter);
app.use(facultyRotuer);
app.use(courseRouter.router);
app.use(userRouter);
app.use(academicSemesterRegistrationRoute);
app.use(offeredCourseRoute);
app.use(AuthRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
