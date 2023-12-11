import catchAsync from "../../utils/catchAsync";
import { courseServices } from "./course.service";

const createCourse = catchAsync(async (req, res) => {
  const result = await courseServices.createCourseInToDB(req.body);
  res.status(200).json({
    success: true,
    message: 'Course successfully created',
    data: result,
  });
});

const getAllCourse = catchAsync(async (req, res) => {

  const result = await courseServices.getAllCourseFromDB(req.query);
  res.status(200).json({
    success: true,
    message: 'All Course successfully fetched',
    data: result,
  });
});

const getSingleCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await courseServices.getSingleCourseFromDB(id);
  res.status(200).json({
    success: true,
    message: 'single course successfully fetched',
    data: result,
  });
});
const updateCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await courseServices.updateCourseInToDB(
    req.body,
    id,
  );
  res.status(200).json({
    success: true,
    message: 'course is updated successfully',
    data: result,
  });
});

const deleteSingleCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await courseServices.deleteCourseFromDB(id);
  res.status(200).json({
    success: true,
    message: 'single course successfully deleted',
    data: result,
  });
});

export const coursesControllers = {
createCourse,
getAllCourse,
getSingleCourse,
updateCourse,
deleteSingleCourse
};
