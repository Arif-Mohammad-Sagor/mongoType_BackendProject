
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
  id: string;
  name: TStudentName;
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
  isActive: 'active' | 'blocked';
};
