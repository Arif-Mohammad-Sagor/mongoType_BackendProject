import mongoose from 'mongoose';
import config from '../../config';
import { academicSemesterModel } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/interface.student';
import { studentModel } from '../student/model.student';
import { TUser } from './user.interfece';
import { userModel } from './user.model';
import { generateFacultyid, generateStudentId } from './user.utils';
import ErrorApp from '../../errors/ErrorApp';
import httpStatus from 'http-status';
import { IFaculty } from '../faculty/faculty.interface';
import { acadDeptModel } from '../academicDepartment/acadDept.model';
import { modelFaculty } from '../faculty/faculty.model';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  // create a user Object
  const userData: Partial<TUser> = {};
  // if password is not given,use default password.
  userData.password = password || (config.default_password as string);
  // setting a user role
  userData.role = 'student';

  //find adminssion semester
  const admissionSemester = await academicSemesterModel.findById(
    payload.admissionSemester,
  );

  if (!admissionSemester) {
    throw new Error('Invalid admission semester');
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    // set generated id
    userData.userId = await generateStudentId(admissionSemester);
    // create a user
    const newUser = await userModel.create([userData], { session });
    // create a student
    if (newUser.length) {
      payload.userId = newUser[0].userId;
      payload.user = newUser[0]._id;
      if (!newUser.length) {
        throw new ErrorApp(httpStatus.BAD_REQUEST, 'Falied to create user');
      }

      const newStudent = await studentModel.create([payload], { session });
      if (!newStudent.length) {
        throw new ErrorApp(httpStatus.BAD_REQUEST, 'Failed to create new user');
      }
      await session.commitTransaction();
      await session.endSession();
      return newStudent;
    }
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new ErrorApp(httpStatus.BAD_REQUEST, 'Failed to create student');
  }
};

const createFacultyInToDB = async (password: string, payload: IFaculty) => {
  const userData: Partial<TUser> = {};
  userData.password = password || config.default_password;
  userData.role = 'student';
  const academicDepartment = await acadDeptModel.findById(
    payload.academicDepartment,
  );

  if (!academicDepartment) {
    throw new ErrorApp(400, ' Academic  Department Not Found');
  }
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    userData.userId = await generateFacultyid();
    const newUser = await userModel.create([userData], { session });
    if (!newUser.length) {
      throw new ErrorApp(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    payload.id = newUser[0].id;
    payload.userId = newUser[0]._id;
    // create a faculty (transaction-2)

    const newFaculty = await modelFaculty.create([payload], { session });

    if (!newFaculty.length) {
      throw new ErrorApp(httpStatus.BAD_REQUEST, 'Failed to create faculty');
    }

    await session.commitTransaction();
    await session.endSession();

    return newFaculty;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};

export const userServices = {
  createStudentIntoDB,
  createFacultyInToDB,
};
