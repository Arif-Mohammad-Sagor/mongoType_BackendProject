import { Model, Types } from 'mongoose';

export interface IName {
  firstName: string;
  middleName?: string;
  lastName: string;
}
export type TGender = 'male' | 'female' | 'others';
export type TBloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

export interface IFaculty {
  id: string;
  userId: Types.ObjectId;
  name:IName,
  gender: TGender;
  bloodGroup?: TBloodGroup;
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  academicDepartment: Types.ObjectId;
  // academicFaculty: Types.ObjectId;
  designation: string;
  profileImg?: string;
  isDeleted: boolean;
}

export interface facultyModel extends Model<IFaculty>{
  isUserExists(id:string):Promise<IFaculty | null>
}