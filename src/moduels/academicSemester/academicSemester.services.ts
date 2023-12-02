import { academicSemesterNameCodeMapper } from './academicSemester.constants';
import { IAcademinSemester } from './academicSemester.interface';
import { academicSemesterModel } from './academicSemester.model';

const createAcademinSemesterDB = async (payload: IAcademinSemester) => {
  
  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new Error('Invalid Academic Code !');
  }

  const result = await academicSemesterModel.create(payload);
  return result;
};

export const AcademicSemesterServices = {
  createAcademinSemesterDB,
};
