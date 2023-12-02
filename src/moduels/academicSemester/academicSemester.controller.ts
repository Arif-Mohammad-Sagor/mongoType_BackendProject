import catchAsync from '../../utils/catchAsync';
import { AcademicSemesterServices } from './academicSemester.services';

export const createAcademicSemesterController = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.createAcademinSemesterDB(req.body);

  res.status(200).json({
    success: true,
    message: 'Semester is Created',
    data: result,
  });
});

export const allAcademicSemester =catchAsync(
   async(req,res)=>{
    const result =await AcademicSemesterServices.allAcademicSemesterServices();
      res.status(200).json({
    success: true,
    message: 'All Semester is Created',
    data: result,
  });
   }
)

export const singleAcademicSemester = catchAsync(async (req, res) => {
  const {id} = req.params;
  const result = await AcademicSemesterServices.singleAcademicSemester(id);
  res.status(200).json({
    success: true,
    message: 'Semester is found',
    data: result,
  });
});
export const updateSignleAcademicSemester = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AcademicSemesterServices.updateSignleAcademicSemester(id,req.body);
  res.status(200).json({
    success: true,
    message: 'Semester is Updated',
    data: result,
  });
});
