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
