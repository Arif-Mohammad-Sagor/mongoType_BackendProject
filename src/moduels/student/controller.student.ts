// import { NextFunction, Request, RequestHandler, Response } from 'express';
// import { StudentServices } from './student.services';
// import studentValidationSchema from './student.validator';

// const catchAsync = (fn: RequestHandler) => {
//   return (req: Request, res: Response, next: NextFunction) => {
//     Promise.resolve(fn(req, res, next)).catch((err) => next(err));
//   };
// };

// const studentController = catchAsync(async (req,res,next) => {
//   const student = req.body;
//   // here first sending data for validatoin then sending for insert
//   const zodParsedData = studentValidationSchema.parse(student);
//   const result = await StudentServices.createStudentDB(zodParsedData);
//   res.status(200).json({
//     success: true,
//     message: 'Student is Created',
//     data: result,
//   });
// });

// export const Controllers = {
//   studentController,
// };
