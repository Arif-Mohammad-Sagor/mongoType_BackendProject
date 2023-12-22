import { Schema, model } from "mongoose";
import { TOfferedCourse } from "./offeredCourse.interface";
import { daysArray } from "./offeredCourse.constants";


const offeredCourseSchema = new Schema<TOfferedCourse>(
  {
    semesterRegistration: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'SemesterRegistrationModel',
    },
    academicSemester: {
      type: Schema.Types.ObjectId,
      ref: 'academicSemesterModel',
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'acadDeptModel',
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'acadFacultyModel',
    },
    course: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: '',
    },
    faculty: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: '',
    },
    days: [
      {
        type: String,
        enum: daysArray,
      },
    ],
    maxCapacity: {
      type: Number,
      required: true,
    },
    section: {
      type: Number,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);


export const offeredModel = model<TOfferedCourse>('offeredCourse',offeredCourseSchema);