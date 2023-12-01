import { Schema, model } from 'mongoose';
import { IAcademinSemester } from './academicSemester.interface';

const academinSemesterSchema = new Schema<IAcademinSemester>(
  {
    name: { type: String, required: [true, 'Academic Name is required'] },
    code: { type: String, required: [true, 'Academin Code is required'] },
    year: { type: Date },
    startMonth: { type: String, required: true },
    endMonth: { type: String, required: true }, 
  },
  {
    timestamps: true,
  },
);

export const academicSemesterModel = model<IAcademinSemester>(
  'AcademicSemester',
  academinSemesterSchema,
);
