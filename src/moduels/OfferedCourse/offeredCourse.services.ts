import httpStatus from 'http-status';
import ErrorApp from '../../errors/ErrorApp';
import { SemesterRegistrationModel } from '../AcademicRegistration/academicRegistration.model';
import { TOfferedCourse } from './offeredCourse.interface';
import { acadDeptModel } from '../academicDepartment/acadDept.model';
import { Course } from '../Course/course.model';
import { modelFaculty } from '../faculty/faculty.model';
import { acadFacultyModel } from '../academicFaculty/acadFaculty.model';
import { offeredModel } from './offeredCourse.model';

const createOfferedCourseInToDB = async (payload: TOfferedCourse) => {
  const {
    semesterRegistration,
    course,
    academicDepartment,
    academicFaculty,
    faculty,
  } = payload;

  const isSemesterRegistrationExists =
    await SemesterRegistrationModel.findById(semesterRegistration);

  if (!isSemesterRegistrationExists) {
    throw new ErrorApp(
      httpStatus.NOT_FOUND,
      'semester registration is not found',
    );
  }
  const academicSemester = isSemesterRegistrationExists?.academicSemester;
  const isAcademicDepartmentExists =
    await acadDeptModel.findById(academicDepartment);
  if (!isAcademicDepartmentExists) {
    throw new ErrorApp(httpStatus.NOT_FOUND, 'AcademicDepartment is not found');
  }

  const isAcademicFacultyExists =
    await acadFacultyModel.findById(academicFaculty);
  if (!isAcademicFacultyExists) {
    throw new ErrorApp(httpStatus.NOT_FOUND, 'Academic Faculty is not found');
  }

  const isFacultyExists = await modelFaculty.findById(faculty);
  if (!isFacultyExists) {
    throw new ErrorApp(httpStatus.NOT_FOUND, ' Faculty is not found');
  }
  const isCourseExists = await Course.findById(course);
  if (!isCourseExists) {
    throw new ErrorApp(httpStatus.NOT_FOUND, ' Course is not found');
  }
  const result = await offeredModel.create({ ...payload, academicSemester });
  return result;
};

const getAllOfferedCourseFromDB = async (query: Record<string, unknown>) => {};
const getSignleOfferedCourseFromDB = async (id: string) => {};
const updateOfferedCourseInToDB = async (
  id: string,
  payload: Partial<TOfferedCourse>,
) => {};
const deleteOfferedCourseFromDB = async (id: string) => {};
export const OffercourseServices = {
  createOfferedCourseInToDB,
  getAllOfferedCourseFromDB,
  getSignleOfferedCourseFromDB,
  updateOfferedCourseInToDB,
  deleteOfferedCourseFromDB,
};
