import catchAsync from '../../utils/catchAsync';
import { AcademicSemesterServices } from './academicSemester.services';

export const createAcademicSemesterController = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.createAcademinSemesterDB(req.body);

  res.status(200).json({
    success: true,
    message: 'Semester is Created',
    data: result,
  });
});
