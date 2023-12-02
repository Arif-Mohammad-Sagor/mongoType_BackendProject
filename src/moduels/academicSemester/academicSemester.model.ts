import { Schema, model } from 'mongoose';
import { IAcademinSemester } from './academicSemester.interface';
import {
  Months,
  academicSemesterCodes,
  academicSemesterNames,
} from './academicSemester.constants';

const academinSemesterSchema = new Schema<IAcademinSemester>(
  {
    name: { type: String, required: true, enum: academicSemesterNames },
    code: { type: String, required: true, enum: academicSemesterCodes },
    year: { type: String, required: true },
    startMonth: { type: String, required: true, enum: Months },
    endMonth: { type: String, required: true, enum: Months },
  },
  {
    timestamps: true,
  },
);

academinSemesterSchema.pre('save', async function (next) {
  const isAcademicSemesterExits = await academicSemesterModel.findOne({
    year: this.year,
    name: this.name,
  });
  if (isAcademicSemesterExits) {
    throw new Error('Semester Already Exits !');
  }
  next();
});

export const academicSemesterModel = model<IAcademinSemester>(
  'AcademicSemester',
  academinSemesterSchema,
);
