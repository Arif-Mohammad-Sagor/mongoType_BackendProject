// import { Request,Response } from 'express';
// import { StudentServices } from './student.services';
// import studentValidationSchema from './student.validator';


// const studentController = async (req: Request, res: Response) => {
//   try {
//     const student= req.body;
//     // here first sending data for validatoin then sending for insert
//     const zodParsedData = studentValidationSchema.parse(student);
//     const result = await StudentServices.createStudentDB(zodParsedData);
//     res.status(200).json({
//       success: true,
//       message: 'Student is Created',
//       data: result,
//     });
//   } catch (error) {
//     console.error(error);
//   }
// };

// export const Controllers = {
//   studentController,
// };
