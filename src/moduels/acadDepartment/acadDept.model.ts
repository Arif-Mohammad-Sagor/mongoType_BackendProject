import { Schema } from 'mongoose';
import { IAcadDept } from './acadDept.interface';
import { model } from 'mongoose';
import ErrorApp from '../../errorsApp/ErrorApp';
import httpStatus from 'http-status';

const acadDeptSchema = new Schema<IAcadDept>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  academicFaculty: {
    type: Schema.Types.ObjectId,
    ref: 'acadFaculty',
  },
});

acadDeptSchema.pre('save', async function (next) {
  const isDepartmentExists = await acadDeptModel.findOne({
    name: this.name,
  });
  if (!isDepartmentExists) {
    throw new ErrorApp(httpStatus.BAD_REQUEST,'This Department already exits ! ');
  }
  next();
});

acadDeptSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();
  const isDepartmentExits = await acadDeptModel.findOne({ query });
  if (!isDepartmentExits) {
      throw new ErrorApp(httpStatus.NOT_FOUND,'This department does not exist! ');
  }
  next();
});

export const acadDeptModel = model<IAcadDept>('acadDepartment', acadDeptSchema);
