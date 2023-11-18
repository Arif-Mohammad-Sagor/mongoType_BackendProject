import { studentModel } from './model.student';
import { Student } from './interface.student';

const createStudentDB = async (student: Student) => {
  const result = await studentModel.create(student);
  return result;
};

export const StudentServices = {
  createStudentDB,
};
