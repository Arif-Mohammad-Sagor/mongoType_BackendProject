import { IAcademinSemester } from '../academicSemester/academicSemester.interface';
import { IFaculty } from '../faculty/faculty.interface';
import { modelFaculty } from '../faculty/faculty.model';
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

const findLastFacultyId = async () => {
  const lastFaculty = await modelFaculty
    .findOne(
      {
        role: 'faculty',
      },
      { id: 1, _id: 0 },
    )
    .sort({
      createdAt: -1,
    })
    .lean();
  return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined;
};

export const generateFacultyid = async () => {
  let currentId = (0).toString();
  const lastFacultyId = await findLastFacultyId();
  if (lastFacultyId) {
    currentId = lastFacultyId.substring(2);
  }
  let increamentId = (Number(currentId) + 1).toString().padStart(4, '0');
  increamentId = `F-${increamentId}`;
  return increamentId;
};
