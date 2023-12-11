import { z } from 'zod';
import { Gender, bloodGroup } from './faculty.constant';
const createUserNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(3)
    .max(20)
    .refine((value) => /^[A-Z]/.test(value), {
      message: 'First Name must start with a capital letter',
    }),
  middleName: z.string().optional(),
  lastName: z.string(),
});
const createFacultyValidationSchema = z.object({
  body: z.object({
    password: z.string().min(8).max(20),
    faculty: z.object({
      name: createUserNameValidationSchema,
      designation: z.string(),
      gender: z.enum([...Gender] as [string, ...string[]]),
      bloodGroup: z.enum([...bloodGroup] as [string, ...string[]]).optional(),
      dateOfBirth: z.string(),
      email: z.string(),
      contactNo: z.string(),
      emergencyContactNo: z.string(),
      presentAddress: z.string(),
      permanentAddress: z.string(),
      academicDepartment: z.string(),
      profileImg: z.string().optional(),
      isDeleted: z.boolean(),
    }),
  }),
});

const updateFacultyValidationSchema = z.object({
  body: z.object({
    password: z.string().min(8).max(20).optional(),
    faculty: z.object({
      name: createUserNameValidationSchema.optional(),
      designation: z.string().optional(),
      gender: z.enum([...Gender] as [string, ...string[]]).optional(),

      bloodGroup: z.enum([...bloodGroup] as [string, ...string[]]).optional(),
      dateOfBirth: z.string().optional(),
      email: z.string(),
      contactNo: z.string(),
      emergencyContactNo: z.string(),
      presentAddress: z.string(),
      permanentAddress: z.string(),
      academicDepartment: z.string(),
      profileImg: z.string().optional(),
      isDeleted: z.boolean().optional(),
    }),
  }),
});


export const facultyValidations = {
  createFacultyValidationSchema,
  updateFacultyValidationSchema,
};
