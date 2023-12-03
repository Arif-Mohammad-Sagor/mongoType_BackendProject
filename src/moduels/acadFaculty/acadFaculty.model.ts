import { Schema, model } from 'mongoose';
import { IAcadFaculty } from './acadFaculty.interface';

const acadFacultySchema = new Schema<IAcadFaculty>(
  {
    name: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  },
);

export const acadFacultyModel = model<IAcadFaculty>(
  'acadFaculty',
  acadFacultySchema,
);
