import {z} from 'zod';

export const academicRegistrationValidationSchema = z.object({
  body:z.object({
   academicSemester:z.string(),
   status:z.enum(['ONGOING','UPCOMING','CLOSED']),
   startDate:z.string().datetime(),
   endDate:z.string().datetime(),
   
   minCredit:z.number(),
   maxCredit:z.number()
  })
})


export const updateAcademicRegistrationValidationSchema = z.object({
  body: z.object({
    academicSemester: z.string().optional(),
    status: z.enum(['ONGOING', 'UPCOMING', 'CLOSED']).optional(),
    startDate: z.string().datetime().optional(),
    endDate: z.string().datetime().optional(),

    minCredit: z.number().optional(),
    maxCredit: z.number().optional(),
  }),
});
