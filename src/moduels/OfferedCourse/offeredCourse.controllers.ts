import catchAsync from '../../utils/catchAsync';
import { OffercourseServices } from './offeredCourse.services';

export const createOfferedCourse = catchAsync(async (req, res) => {
  const result = await OffercourseServices.createOfferedCourseInToDB(req.body);
  res.status(200).json({
    success: true,
    message: 'Offered Coursed is Created',
    data: result,
  });
});

export const getAllOfferedCourse = catchAsync(async (req, res) => {
  const result = await OffercourseServices.getAllOfferedCourseFromDB(req.query);
  res.status(200).json({
    success: true,
    message: 'All Offered Coursed is retrived',
    data: result,
  });
});

export const getSingleOfferedCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await OffercourseServices.getSignleOfferedCourseFromDB(id);
  res.status(200).json({
    success: true,
    message: 'Offered Coursed is retrived',
    data: result,
  });
});
export const updateOfferedCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await OffercourseServices.updateOfferedCourseInToDB(id,req.body);
  res.status(200).json({
    success: true,
    message: 'Offered Coursed is updated',
    data: result,
  });
});
export const deleteOfferedCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await OffercourseServices.deleteOfferedCourseFromDB(id);
  res.status(200).json({
    success: true,
    message: 'Offered deleted is successfully',
    data: result,
  });
});


