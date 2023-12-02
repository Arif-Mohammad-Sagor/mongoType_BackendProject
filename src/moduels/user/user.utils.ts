import { IAcademinSemester } from "../academicSemester/academicSemester.interface";
import { userModel } from "./user.model";

const findLastStudentId =async () => {
  const lastStudent = await userModel.findOne({
    role:'student'
  },{
    id:1,
    _id:0
  },
  ).sort({createAt:-1}).lean()
  return lastStudent?.userId?lastStudent.userId.substring(6):undefined;
}

export const generateStudentId=async(payload:IAcademinSemester)=>{

  const currentId=(await findLastStudentId()) ||(0).toString() ;
  let increamentId =( Number(currentId) + 1).toString().padStart(4,'0');

  increamentId = `${payload.year}${payload.code}${increamentId}`;
  return increamentId;

}