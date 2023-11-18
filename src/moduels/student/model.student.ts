import { Schema, model } from 'mongoose';
import { Gaurdian, Student, StudentName, localGaurdian } from './interface.student';


const  nameSchema = new Schema<StudentName>({
firstName:{type:String, required:true},
middleName:{type:String},
lastName:{type:String,required:true}
}
)
const GaurdianSchema = new Schema<Gaurdian>({
  fatherName: { type: String, required: true },
  fatherOccapation: { type: String },
  fatherContact: { type: String, required: true },
});

const localGaurdianSchema = new Schema <localGaurdian>({
name:{type:String,required:true},
occapation:{type:String,required:true},
contactNo:{type:String,required:true},
address:{type:String,required:true}
})

const StudentSchema = new Schema<Student>({
  id: { type: String },
  name: nameSchema,
  gender: { type: String, required: true },
  dateOfBirth: { type: String },
  email: { type: String, required: true },
  contactNo: { type: String, required: true },
  emergencyContact: { type: String, required: true },
  bloodGroup: ['A+' , 'A-' , 'B' , 'B-' , 'AB' , 'O+' , 'O-'],
  presentAddress:{type:String,required:true},
  permanentAddress:{type:String,required:true},
  gaurdian:GaurdianSchema,
  localGaurdian:localGaurdianSchema,
  isActive:{type:String,required:true}
});

export const studentModel = model<Student>('Student',StudentSchema);
