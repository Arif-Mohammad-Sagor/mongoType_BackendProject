import mongoose from 'mongoose';
import config from '../../config';
import { academicSemesterModel } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/interface.student';
import { studentModel } from '../student/model.student';
import { IUser } from './user.interfece';
import { userModel } from './user.model';
import { generateStudentId } from './user.utils';
import ErrorApp from '../../errors/ErrorApp';
import httpStatus from 'http-status';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  // create a user Object
  const userData: Partial<IUser> = {};
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

export const userServices = {
  createStudentIntoDB,
};
