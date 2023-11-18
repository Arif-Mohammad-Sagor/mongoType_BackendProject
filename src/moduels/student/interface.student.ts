export type StudentName = {
firstName:string;
middleName?:string;
lastName:string;

}
export type Gaurdian = {
fatherName:string;
fatherOccapation:string;
fatherContact:string;
}
export type localGaurdian = {
name:string;
occapation:string;
contactNo:string;
address:string;

}
 
export type Student = {
  id: string;
  name: StudentName;
  gender: 'male' | 'female';
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContact: string;
  bloodGroup: 'A+'| 'A-' | 'B' | 'B-' | 'AB' | 'O+' | 'O-';
  presentAddress:string;
  permanentAddress:string;
  gaurdian:Gaurdian;
  localGaurdian:localGaurdian;
  profileImg?:string;
  isActive:'active' | 'blocked'
};