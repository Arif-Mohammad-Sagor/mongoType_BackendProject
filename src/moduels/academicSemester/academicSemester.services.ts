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

const allAcademicSemesterServices = async () => {
  const result = await academicSemesterModel.find();
  return result;
};
const singleAcademicSemester = async (id: string) => {
  const result = await academicSemesterModel.findById(id);
  return result;
};

const updateSignleAcademicSemester = async (
  id: string,
  payload: Partial<IAcademinSemester>,
) => {
  if (
    payload.name &&
    payload.code &&
    academicSemesterNameCodeMapper[payload.name] !== payload.code
  ) {
    throw new Error('Invalid Semester Code');
  }

  const result = await academicSemesterModel.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    },
  );
  return result;
};

export const AcademicSemesterServices = {
  createAcademinSemesterDB,
  allAcademicSemesterServices,
  singleAcademicSemester,
  updateSignleAcademicSemester,
};
