import catchAsync from '../../utils/catchAsync';
import { AcadDepartmentServices } from './acadDept.services';

const createDeptIntoDB = catchAsync(async (req, res) => {
  const result = await AcadDepartmentServices.createAcadDeptIntoDB(req.body);
  res.status(200).json({
    success: true,
    message: 'Department successfully created',
    data: result,
  });
});

const getAllDeptFromDB = catchAsync(async (req, res) => {
  const result = await AcadDepartmentServices.getAllAcadDeptFromDB();
  res.status(200).json({
    success: true,
    message: 'All Department successfully fetched',
    data: result,
  });
});

const getSingleDeptFromDB = catchAsync(async (req, res) => {
  const {id}=req.params;
  const result = await AcadDepartmentServices.getSingleAcadDeptFromDb(id);
  res.status(200).json({
    success: true,
    message: 'Department successfully fetched',
    data: result,
  });
});
const updateSingleDeptFromDB = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AcadDepartmentServices.updateSingleAcadDeptFromDb(req.body,id);
  res.status(200).json({
    success: true,
    message: 'All Department successfully fetched',
    data: result,
  });
});

export const AcadDepartmentControllers = {
  createDeptIntoDB,
  getAllDeptFromDB,
  getSingleDeptFromDB,
  updateSingleDeptFromDB,
};
