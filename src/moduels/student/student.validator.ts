import { z } from 'zod';

const studentNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(1)
    .max(20)
    .refine((value) => /^[A-Z]/.test(value), {
      message: 'first name must start with a capital letter',
    }),
  middleName: z.string(),
  lastName: z.string(),
});
const gaurdainValidationSchema = z.object({
  fatherName: z.string(),
  fatherOccapation: z.string(),
  fatherContact: z.string(),
});
const localGaurdianValidatorSchema = z.object({
  name: z.string(),
  occapation: z.string(),
  contactNo: z.string(),
  address: z.string(),
});


const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().min(8).max(20),
    student: z.object({
      name: studentNameValidationSchema,
      gender: z.enum(['male', 'female', 'other']),
      dateOfBirth: z.string(),
      email: z.string().email(),
      contactNo: z.string(),
      emergencyContact: z.string(),
      bloodGroup: z.enum(['A+', 'A-', 'B', 'B-', 'AB', 'O+', 'O-']),
      presentAddress: z.string(),
      permanentAddress: z.string(),
      gaurdian: gaurdainValidationSchema,
      localGaurdian: localGaurdianValidatorSchema,
      profileImg: z.string(),
      admissionSemester: z.string(),
      academicDepartment: z.string(),
    }),
  }),
});


const updateUserNameValidationSchema = z.object({
  firstName: z.string().min(1).max(20).optional(),
  middleName: z.string().optional(),
  lastName: z.string().optional(),
});

const updateGuardianValidationSchema = z.object({
  fatherName: z.string().optional(),
  fatherOccupation: z.string().optional(),
  fatherContactNo: z.string().optional(),
  motherName: z.string().optional(),
  motherOccupation: z.string().optional(),
  motherContactNo: z.string().optional(),
});

const updateLocalGuardianValidationSchema = z.object({
  name: z.string().optional(),
  occupation: z.string().optional(),
  contactNo: z.string().optional(),
  address: z.string().optional(),
});

export const updateStudentValidationSchema = z.object({
  body: z.object({
    student: z.object({
      name: updateUserNameValidationSchema,
      gender: z.enum(['male', 'female', 'other']).optional(),
      dateOfBirth: z.string().optional(),
      email: z.string().email().optional(),
      contactNo: z.string().optional(),
      emergencyContactNo: z.string().optional(),
      bloogGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
      presentAddress: z.string().optional(),
      permanentAddress: z.string().optional(),
      guardian: updateGuardianValidationSchema.optional(),
      localGuardian: updateLocalGuardianValidationSchema.optional(),
      profileImg: z.string().optional(),
      admissionSemester: z.string().optional(),
      academicDepartment: z.string().optional(),
    }),
  }),
});


export const studentValidations = {
  createStudentValidationSchema,
};
