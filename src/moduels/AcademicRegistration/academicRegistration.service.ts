import httpStatus from 'http-status';
import ErrorApp from '../../errors/ErrorApp';
import { TSemesterRegistration } from './academicRegistration.interface';
import { SemesterRegistrationModel } from './academicRegistration.model';
import { academicSemesterModel } from '../academicSemester/academicSemester.model';

const createRegistrationSemesterIntoDB = async (
  payload: TSemesterRegistration,
) => {
  console.log(payload);
  const academicSemester = payload.academicSemester;

  const isAcademicSemesterExists = await academicSemesterModel.findById({
    _id: academicSemester,
  });
  if (!isAcademicSemesterExists) {
    throw new ErrorApp(httpStatus.NOT_FOUND, 'Academic semester do not exist');
  }

  const isSemesterRegistrationExists = await SemesterRegistrationModel.findOne({
    academicSemester,
  });
  if (isSemesterRegistrationExists) {
    throw new ErrorApp(httpStatus.CONFLICT, 'Semester already registered');
  }

  const result = await SemesterRegistrationModel.create(payload);
  return result;
};
const getAllRegisterSemesterFromDB = () => {};

const updateRegisterSemesterIntoDB = (
  payload: TSemesterRegistration,
  id: string,
) => {};
const deleteRegisterSemesterIntoDB = (id: string) => {};

export const semesterRegistrationSevices = {
  createRegistrationSemesterIntoDB,
  getAllRegisterSemesterFromDB,
  updateRegisterSemesterIntoDB,
  deleteRegisterSemesterIntoDB,
};
