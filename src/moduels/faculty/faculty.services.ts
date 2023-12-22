import { modelFaculty } from './faculty.model';

const getAllFaculty = async () => {
  const result = await modelFaculty.find();
  return result;
};

export const facultyServices = {
  getAllFaculty,
};
