import { faculty } from "./faculty.model"

const getAllFaculty =async()=>{
const result = await faculty.find();
return result;
}

export const facultyServices ={
  getAllFaculty,
}