import catchAsync from '../../utils/catchAsync';
import { facultyServices } from './faculty.services';

const getAllFaculty = catchAsync(async (req, res) => {
  const result = await facultyServices.getAllFaculty();
  res.status(200).json({
    success: true,
    message: 'All Faculty successfully fetched',
    data: result,
  });
});

export const facultyController = {
  getAllFaculty,
};
