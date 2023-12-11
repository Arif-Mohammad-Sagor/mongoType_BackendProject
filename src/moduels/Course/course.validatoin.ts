import {z} from 'zod';

const TpreRequisiteCoureseValidationSchema = z.object({
  course:z.string(),
  isDeleted:z.boolean().optional().default(false)
})

const CreatecourseValidationSchema = z.object({
body:z.object({
    title:z.string(),
  prefix:z.string(),
  code:z.number(),
  credits:z.number(),
  preRequisiteCourses:z.array(TpreRequisiteCoureseValidationSchema).optional(),
  isDeleted:z.boolean().optional().default(false)
})
})

const updateCourseValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    prefix: z.string().optional(),
    code: z.number().optional(),
    credits: z.number().optional(),
    preRequisiteCourses: z
      .array(TpreRequisiteCoureseValidationSchema)
      .optional(),
    isDeleted: z.boolean().optional().default(false),
  }),
});
export const courseValidations = {
  CreatecourseValidationSchema,
  updateCourseValidationSchema
};