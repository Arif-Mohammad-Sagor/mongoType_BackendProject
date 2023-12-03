import { IAcadDept } from '../acadDepartment/acadDept.interface';
import { acadDeptModel } from './acadDept.model';

const createAcadDeptIntoDB = async (payload: IAcadDept) => {
  const result = await acadDeptModel.create(payload);
  return result;
};
const getAllAcadDeptFromDB = async () => {
  const result = await acadDeptModel.find();
  return result;
};

const getSingleAcadDeptFromDb = async (id: string) => {
  const result = await acadDeptModel.findById(id);
  return result;
};
const updateSingleAcadDeptFromDb = async (
  payload: Partial<IAcadDept>,
  id: string,
) => {
  const result = await acadDeptModel.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};
export const AcadDepartmentServices = {
  createAcadDeptIntoDB,
  getAllAcadDeptFromDB,
  getSingleAcadDeptFromDb,
  updateSingleAcadDeptFromDb,
};
