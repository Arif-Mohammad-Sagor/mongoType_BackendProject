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
const studentValidationSchema = z.object({
  id: z.string(),
  name: studentNameValidationSchema,
  gender: z.enum(['male', 'female', 'other']),
  dateOfBirth: z.date(),
  email: z.string().email(),
  contactNo: z.string(),
  emergencyContact: z.string(),
  bloodGroup: z.enum(['A+', 'A-', 'B', 'B-', 'AB', 'O+', 'O-']),
  presentAddress: z.string(),
  permanentAddress: z.string(),
  gaurdian: gaurdainValidationSchema,
  localGaurdian: localGaurdianValidatorSchema,
  profileImg: z.string(),
  isActive: z.enum(['active', 'blocked']).default('active'),
});

export default studentValidationSchema;
