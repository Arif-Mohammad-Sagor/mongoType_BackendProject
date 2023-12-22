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
const getAllSemesterRegistration = catchAsync(async(req, res) => {
  const result = await semesterRegistrationSevices.getAllRegisterSemesterFromDB(req.query);
   res.status(200).json({
     success: true,
     message: 'SemesterRegistration is retrived successfullly',
     data: result,
   });

  });
  const singleSemesterRegistration = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await semesterRegistrationSevices.getSignleRegisterSemesterFromDB(id);
     res.status(200).json({
       success: true,
       message: 'single SemesterRegistration is retrived successfullly',
       data: result,
     });
  });
const updateSemesterRegistration = catchAsync(async (req, res) => {
const {id}=req.params;
const result = await semesterRegistrationSevices.updateRegisterSemesterIntoDB(id,req.body);
 res.status(200).json({
   success: true,
   message: 'single SemesterRegistration is retrived successfullly',
   data: result,
 });
});
const deleteSemesterRegistration = catchAsync(async (req, res) => {});
export const SemesterRegistrationContollers = {
  createSemesterRegistration,
  getAllSemesterRegistration,
  singleSemesterRegistration,
  updateSemesterRegistration,
  deleteSemesterRegistration,
};