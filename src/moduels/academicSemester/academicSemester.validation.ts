import { z } from 'zod';
import {
  Months,
  academicSemesterCodes,
  academicSemesterNames,
} from './academicSemester.constants';

export const createAcademicSemesterValidationSchema = z.object({
  body: z.object({
    name: z.enum([...academicSemesterNames] as [string, ...string[]]),
    code: z.enum([...academicSemesterCodes] as [string, ...string[]]),
    year: z.string(),
    startMonth: z.enum([...Months] as [string, ...string[]]),
    endMonth: z.enum([...Months] as [string, ...string[]]),
  }),
});
