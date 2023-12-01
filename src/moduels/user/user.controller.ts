import { userServices } from './user.services';
import catchAsync from '../../utils/catchAsync';

// why we are creating student instead of user
const createStudent = catchAsync(
  async (req, res,) => {
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
