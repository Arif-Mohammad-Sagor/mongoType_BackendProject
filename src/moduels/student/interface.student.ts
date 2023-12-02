import { Model, Types } from 'mongoose';

export type TStudentName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};
export type TGaurdian = {
  fatherName: string;
  fatherOccapation: string;
  fatherContact: string;
};
export type TlocalGaurdian = {
  name: string;
  occapation: string;
  contactNo: string;
  address: string;
};

export type TStudent = {
  userId: string;
  name: TStudentName;
  user: Types.ObjectId;
  gender: 'male' | 'female' | 'other';
  dateOfBirth: Date;
  email: string;
  contactNo: string;
  emergencyContact: string;
  bloodGroup: 'A+' | 'A-' | 'B' | 'B-' | 'AB' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  gaurdian: TGaurdian;
  localGaurdian: TlocalGaurdian;
  profileImg?: string;
  admissionSemester: Types.ObjectId;
};

//for creating static

export interface StudentModel extends Model<TStudent> {
  isUserExists(userId: string): Promise<TStudent | null>;
}
