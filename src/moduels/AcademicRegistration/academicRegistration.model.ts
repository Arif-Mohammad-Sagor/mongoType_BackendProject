import { Schema, model } from 'mongoose';
import { TSemesterRegistration } from './academicRegistration.interface';



const SemesterRegistrationSchema = new Schema<TSemesterRegistration>({
  academicSemester: {
    type: Schema.Types.ObjectId,
    required: true,
    unique: true,
    ref: 'AcademicSemester',
  },
  status: {
    type: String,
    enum: ['ONGOING', 'UPCOMING', 'CLOSED'],
    default: 'UPCOMING',
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  minCredit:{
    type:Number,
    required:true,
  },
  maxCredit:{
    type:Number,
    required:true,
  }
});

export const SemesterRegistrationModel = model<TSemesterRegistration>('semesterRegistration',SemesterRegistrationSchema)