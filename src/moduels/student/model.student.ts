import { Schema, model } from 'mongoose';
import {
  TGaurdian,
  TStudent,
  TStudentName,
  TlocalGaurdian,
} from './interface.student';

const nameSchema = new Schema<TStudentName>({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
  },
  middleName: { type: String },
  lastName: { type: String, required: [true, 'First name is required'] },
});
const GaurdianSchema = new Schema<TGaurdian>({
  fatherName: { type: String, required: true },
  fatherOccapation: { type: String },
  fatherContact: { type: String, required: true },
});

const localGaurdianSchema = new Schema<TlocalGaurdian>({
  name: { type: String, required: true },
  occapation: { type: String, required: true },
  contactNo: { type: String, required: true },
  address: { type: String, required: true },
});

const StudentSchema = new Schema<TStudent>({
  userId: { type: String },
  name: nameSchema,
  user: {
    type: Schema.Types.ObjectId,
    required: [true, 'User is required'],
    unique: true,
    ref: 'User',
  },
  admissionSemester: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'AcademicSemester',
  },
  academicDepartment: {
    type: Schema.Types.ObjectId,
    required: true,
    ref:'AcademicDepartment',
  },
  gender: { type: String, required: true },
  dateOfBirth: { type: Date },
  email: { type: String, required: true },
  contactNo: { type: String, required: true },
  emergencyContact: { type: String, required: true },
  bloodGroup: ['A+', 'A-', 'B', 'B-', 'AB', 'O+', 'O-'],
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  gaurdian: GaurdianSchema,
  localGaurdian: localGaurdianSchema,
});

export const studentModel = model<TStudent>('Student', StudentSchema);
