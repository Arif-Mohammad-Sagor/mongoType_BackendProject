import { NextFunction, Request, Response } from 'express';
import { userServices } from './user.services';

// why we are creating student instead of user
const createStudent = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const { password, student: studentData } = req.body;
    // console.log(req.body);
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
  } catch (error) {
    next(error)
  }
};

export const userControllers = {
  createStudent,
};
