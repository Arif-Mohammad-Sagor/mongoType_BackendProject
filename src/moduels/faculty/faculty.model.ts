import { Schema, model } from 'mongoose';
import { IFaculty, IName, facultyModel } from './faculty.interface';
import { Gender, bloodGroup } from './faculty.constant';

const IUserNameSchema = new Schema<IName>({
  firstName: {
    type: String,
    required: [true, 'FirstName is required'],
    maxlength: [20, 'FirstName can not be more 20 charecters'],
    trim: true,
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'LastName is required'],
    maxlength: [20, 'FirstName can not be more 20 charecters'],
    trim: true,
  },
});

const facultySchema = new Schema<IFaculty>({
  id: { type: String },
  userId: {
    type: Schema.Types.ObjectId,
    required: [true, 'userId is required'],
    unique: true,
    ref: 'user',
  },
  academicDepartment: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'AcademicDepartment',
  },
  name: {
    type: IUserNameSchema,
    required: [true, 'Name is required'],
  },
  gender: {
    type: String,
    enum: {
      values: Gender,
      message: '{Value} is not valid gender',
    },
  },
  bloodGroup: {
    type: String,
    enum: {
      values: bloodGroup,
      message: '{Values} is not a valid bloodGroup',
    },
  },
  dateOfBirth: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  contactNo: {
    type: String,
    required: [true, 'Contact is required'],
  },
  emergencyContactNo: {
    type: String,
    required: [true, 'EmergencyContact is required'],
  },
  presentAddress: {
    type: String,
    required: true,
  },
  permanentAddress: {
    type: String,
    required: true,
  },
  designation: { type: String },
  isDeleted: { type: Boolean, default: false },
  profileImg: { type: String },
});

export const modelFaculty = model<IFaculty, facultyModel>(
  'faculty',
  facultySchema,
);

// checking this user already exists ?
facultySchema.statics.isUserExists = async function (id: string) {
  const ExistingUser = await modelFaculty.findById(id);
  return ExistingUser;
};
facultySchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
facultySchema.pre('findOne', function (next) {
  this.findById({ isDeleted: { $ne: true } });
  next();
});

facultySchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});


