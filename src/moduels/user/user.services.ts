import config from '../../config';
import { TStudent } from '../student/interface.student';
import { studentModel } from '../student/model.student';
import { IUser } from './user.interfece';
import { userModel } from './user.model';

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  // create a user Object
  const userData: Partial<IUser> = {};
  // if password is not given,use default password.
  userData.password = password || (config.default_password as string);
  // setting a user role
  userData.role = 'student';
  // generating a user id
  userData.userId = '2023110001';

  const newUser = await userModel.create(userData);
  // create a student
  if (Object.keys(newUser).length) {
    studentData.userId = newUser.userId;
    studentData.user = newUser._id;

    const newStudent = await studentModel.create(studentData);
    return newStudent;
  }
};

export const userServices = {
  createStudentIntoDB,
};
