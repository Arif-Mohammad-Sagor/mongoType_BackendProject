import {z} from 'zod';

export const createAcadDeptValidationSchema=z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Dept. name must be string !',
      required_error:"  Dept. Name is required!"
    }),
    academicFaculty: z.string({
      invalid_type_error: 'Academic Faculty name must be string !',
      required_error:"Faculty is required!"
    }),
  }),
});


export const updateAcadDeptValidationSchema =
  z.object({
    body: z.object({
      name: z.string({
        invalid_type_error: 'Dept. name must be string !',
        required_error: '  Dept. Name is required!',
      }).optional(),

      academicFaculty: z.string({
        invalid_type_error: 'Academic Faculty name must be string !',
        required_error: 'Faculty is required!',
      }).optional(),
    }),
  });


// export const acadValidation = {
//   createAcadDeptValidationSchema,
//   updateAcadDeptValidationSchema
// };