import catchAsync from "../../utils/catchAsync"
import { acadFacultyServices } from "./acadFaculty.services"


const createAcadFacultyIntoDB = catchAsync(async (req, res) => {
  const result = await acadFacultyServices.createAcadFacultyIntoDB(req.body);
  res.status(200).json({
    success: true,
    message: 'AcadFaculty is Created',
    data: result,
  });
});
const getAllAcadFacultyFromDB = catchAsync(async (req, res) => {
  const result = await acadFacultyServices.getAllAcadFacultyFromDB()
  res.status(200).json({
    success: true,
    message: 'All AcadFaculty is Fetched',
    data: result,
  });
});
const getSingleAcadFacultyFromDB = catchAsync(async (req, res) => {
  const {id} = req.params;
  const result = await acadFacultyServices.getSingleAcadFacultyFromDB(id);
  res.status(200).json({
    success: true,
    message: 'Single AcadFaculty is fetched successfully',
    data: result,
  });
});
const upateSingleAcadFacultyFromDB = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await acadFacultyServices.updateSingleAcadFacultyFromDB(req.body,id);
  res.status(200).json({
    success: true,
    message: 'Single AcadFaculty is updated successfully',
    data: result,
  });
});

export const acadFacultyControllers = {
  createAcadFacultyIntoDB,
  getAllAcadFacultyFromDB,
  getSingleAcadFacultyFromDB,
  upateSingleAcadFacultyFromDB,
};