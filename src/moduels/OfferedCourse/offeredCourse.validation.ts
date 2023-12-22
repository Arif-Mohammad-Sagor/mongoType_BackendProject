import { z } from 'zod';
import { daysArray } from './offeredCourse.constants';
export const createOfferedCourseValidationSchema = z.object({
  body: z.object({
    semesterRegistration: z.string({
      required_error: 'semester Registration is required',
    }),
    academicFaculty: z.string({
      required_error: 'Academic Faculty is required',
    }),
    academicDepartment: z.string({
      required_error: 'academic Department is required',
    }),
    course: z.string({
      required_error: 'course is required',
    }),
    faculty: z.string({
      required_error: 'faculty is required',
    }),
    maxCapacity: z.number(),
    section: z.number(),
    days: z.array(z.string()),
    startTime: z.string(),
    endTime: z.string(),
  }),
});

export const updateOfferedCourseValidation = z.object({
  body: z.object({
    faculty: z
      .string({
        required_error: 'faculty is required',
      })
      .optional(),
    maxCapacity: z.number().optional(),
    section: z.number().optional(),
    days: z.array(z.enum([...daysArray] as [string, ...string[]])).optional(),
    startTime: z.string().optional(),
    endTime: z.string().optional(),
  }),
});
