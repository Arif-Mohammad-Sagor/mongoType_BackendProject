import { Request,Response } from 'express';
import { StudentServices } from './student.services';

const studentController = async (req: Request, res: Response) => {
  try {
    const student = req.body;
    const result = await StudentServices.createStudentDB(student);
    res.status(200).json({
      success: true,
      message: 'Student is Created',
      data: result,
    });
  } catch (error) {
    console.error(error);
  }
};

export const Controllers = {
  studentController,
};
