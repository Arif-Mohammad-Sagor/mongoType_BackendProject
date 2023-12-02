import { IAcademinSemester } from "./academicSemester.interface"
import { academicSemesterModel } from "./academicSemester.model"

const createAcademinSemesterDB=async(data:IAcademinSemester)=>{
const result = await academicSemesterModel.create(data);
return result;
}

export const AcademicSemesterServices={
  createAcademinSemesterDB
}