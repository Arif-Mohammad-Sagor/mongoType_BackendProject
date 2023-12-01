import { NextFunction, Request, RequestHandler, Response } from 'express';
import { userServices } from './user.services';

const catchAsync = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };
};
// why we are creating student instead of user
const createStudent = catchAsync(
  async (req, res, next) => {
    const { password, student: studentData } = req.body;
    //     const zodParsedData = studentValidationSchema.parse(student);
    const result = await userServices.createStudentIntoDB(
      password,
      studentData,
    );
    res.status(200).json({
      success: true,
      message: 'Student is Created',
      data: result,
    });
  },
);

export const userControllers = {
  createStudent,
};
