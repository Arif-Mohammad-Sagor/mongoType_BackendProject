import { IAcademinSemester } from '../academicSemester/academicSemester.interface';
import { userModel } from './user.model';

const findLastStudentId = async () => {
  const lastStudent = await userModel
    .findOne(
      {
        role: 'student',
      },
      {
        id: 1,
        _id: 0,
      },
    )
    .sort({ createAt: -1 })
    .lean();
  return lastStudent?.userId ? lastStudent.userId : undefined;
};

export const generateStudentId = async (payload: IAcademinSemester) => {
  let currentId = (0).toString();
  const lastStudentId = await findLastStudentId();

  const lastStudentSemesterCode = lastStudentId?.substring(4, 6);
  const lastStudentSemsterYear = lastStudentId?.substring(0, 4);
  const currentSemesterCode = payload.code;
  const currentSemesterYear = payload.year;

  if (
    lastStudentId &&
    lastStudentSemesterCode === currentSemesterCode &&
    lastStudentSemsterYear === currentSemesterYear
  ) {
    currentId = lastStudentId.substring(6);
  }
  let increamentId = (Number(currentId) + 1).toString().padStart(4, '0');

  increamentId = `${payload.year}${payload.code}${increamentId}`;
  return increamentId;
};
