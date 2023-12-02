import config from '../../config';
import { academicSemesterModel } from '../academicSemester/academicSemester.model';

import { TStudent } from '../student/interface.student';
import { studentModel } from '../student/model.student';
import { IUser } from './user.interfece';
import { userModel } from './user.model';
import { generateStudentId } from './user.utils';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  // create a user Object
  const userData: Partial<IUser> = {};
  // if password is not given,use default password.
  userData.password = password || (config.default_password as string);
  // setting a user role
  userData.role = 'student';
  
  //find adminssion semester 
  const admissionSemester = await academicSemesterModel.findById(payload.admissionSemester)

  // set generated id
userData.userId = await generateStudentId(admissionSemester);
// create a user
  const newUser = await userModel.create(userData);
  // create a student
  if (Object.keys(newUser).length) {
    payload.userId = newUser.userId;
    payload.user = newUser._id;

    const newStudent = await studentModel.create(payload);
    return newStudent;
  }
};

export const userServices = {
  createStudentIntoDB,
};
