import { z } from 'zod';
export const createOfferedCourseValidationSchema = z.object({
  body: z
    .object({
      semesterRegistration: z.string({
        required_error: 'semester Registration is required',
      }),
      academicFaculty: z.string({
        required_error: 'Academic Faculty is required',
      }),
      academicDepartment: z.string({
        required_error: 'Academic Department is required',
      }),
      course: z.string({
        required_error: 'Course is required',
      }),
      faculty: z.string({
        required_error: 'Faculty is required',
      }),
      maxCapacity: z.number(),
      section: z.number(),
      days: z.array(z.string()),
      startTime: z.string().refine(
        (time) => {
          
          const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
          return regex.test(time);
        },
        { message: 'Start time should be in Hour:Minutes format' },
      ),
      endTime: z.string().refine(
        (time) => {
       
          const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
          return regex.test(time);
        },
        {
          message: 'End time should be in Hour:Minutes format',
        },
      ),
    })
    .refine(
      (body) => {
        const start = new Date(`1971-12-16T${body.startTime}:00`);
        const end = new Date(`1971-12-16T${body.endTime}:00`);
        return end > start;
      },
      { message: 'endtime should be greater than startTime' },
    ),
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
    days: z.array(z.string()).optional(),
    startTime: z.string().optional(),
    endTime: z.string().optional(),
  }),
});
