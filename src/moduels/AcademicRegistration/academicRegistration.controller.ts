import catchAsync from "../../utils/catchAsync";
import { AcademicSemesterServices } from "../academicSemester/academicSemester.services";
import { semesterRegistrationSevices } from "./academicRegistration.service";


const createSemesterRegistration = catchAsync(async(req, res) => {

  const result = await semesterRegistrationSevices.createRegistrationSemesterIntoDB(req.body);

   res.status(200).json({
     success: true,
     message: 'Semester is Created',
     data: result,
   });
});
const getAllSemesterRegistration=(req,res)=>{

}
const updateSemesterRegistration=(req,res)=>{}
const deleteSemesterRegistration=(req,res)=>{}

export const SemesterRegistrationContollers = {
  createSemesterRegistration,
  getAllSemesterRegistration,
  updateSemesterRegistration,
  deleteSemesterRegistration,
};