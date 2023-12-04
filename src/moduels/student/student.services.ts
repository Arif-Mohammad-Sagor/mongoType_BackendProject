import httpStatus from 'http-status';
import mongoose from 'mongoose';
import { userModel } from '../user/user.model';
import { TStudent } from './interface.student';
import { studentModel } from './model.student';
import ErrorApp from '../../errors/ErrorApp';

const getAllStudentsFromDB = async (query:Record<string,unknown>) => {
// coping so that we can use it to filter 
  const queryOjb= {
    ...query
  }
   let searchTerm= '';
  if(query?.searchTerm){
    searchTerm=query?.searchTerm as string;
  }
  // for searching part and method chaining
const searchQuery = studentModel.find({
  $or: ['email', 'name.firstName', 'presentAddress'].map((field) => ({
    [field]: { $regex: searchTerm, $options: 'i' },
  })),
});
// this arr for filtering options
const excludesQueries =['searchTerm','sort','limit'];
excludesQueries.forEach(elem=> delete queryOjb[elem]);

// sorting functionality 
let sort ='-createdAt';
if(query.sort){
  sort=query.sort as string;
}
const sortedQuery = searchQuery
    .find(queryOjb)
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  const limitedQuery =  sortedQuery.sort(sort);
  let limit =5;
  if(query.limit){
    limit=query.limit as number;
  }
const result = await limitedQuery.limit(limit);
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await studentModel
    .findOne({ id })
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};

const updateStudentIntoDB = async (id: string, payload: Partial<TStudent>) => {
  const { name, gaurdian, localGaurdian, ...remainingStudentData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  if (gaurdian && Object.keys(gaurdian).length) {
    for (const [key, value] of Object.entries(gaurdian)) {
      modifiedUpdatedData[`guardian.${key}`] = value;
    }
  }

  if (localGaurdian && Object.keys(localGaurdian).length) {
    for (const [key, value] of Object.entries(localGaurdian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value;
    }
  }

  // console.log(modifiedUpdatedData);

  const result = await studentModel.findOneAndUpdate(
    { id },
    modifiedUpdatedData,
    {
      new: true,
      runValidators: true,
    },
  );
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedStudent = await studentModel.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedStudent) {
      throw new ErrorApp(httpStatus.BAD_REQUEST, 'Failed to delete student');
    }

    const deletedUser = await userModel.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedUser) {
      throw new ErrorApp(httpStatus.BAD_REQUEST, 'Failed to delete user');
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error('Failed to delete student');
  }
};

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  updateStudentIntoDB,
  deleteStudentFromDB,
};
