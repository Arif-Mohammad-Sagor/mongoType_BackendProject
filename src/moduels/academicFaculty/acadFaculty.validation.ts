import {z} from 'zod';


export const createAcadFacultyValicationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'AcadFaculty must be a string',
    }),
  }),
});
export const updateAcadFacultyValicationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'AcadFaculty must be a string',
    }),
  }),
});