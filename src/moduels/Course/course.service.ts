import mongoose from 'mongoose';
import QueryBuilder from '../../builder/BuilderQuery';
import ErrorApp from '../../errors/ErrorApp';
import { courseSearchableFields } from './course.constant';
import { TCourse } from './course.interface';
import { Course } from './course.model';

const createCourseInToDB = async (payload: TCourse) => {
  const result = await Course.create(payload);
  return result;
};
const getAllCourseFromDB = async (query: Record<string, unknown>) => {
  const courseQurey = new QueryBuilder(
    Course.find().populate('preRequisiteCourses.course'),
    query,
  )
    .search(courseSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await courseQurey.queryModel;
  return result;
};
const getSingleCourseFromDB = async (id: string) => {
  const result = await Course.findById(id).populate(
    'preRequisiteCourses.course',
  );
  return result;
};
const updateCourseInToDB = async (payload: Partial<TCourse>, id: string) => {
  const { preRequisiteCourses, ...remaingCourseData } = payload;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    //operation no-1 
    const updatedBasicCourseInfo = await Course.findByIdAndUpdate(
      id,
      remaingCourseData,
      {
        new: true,
        runValidators: true,
        session
      },
    ).populate('preRequisiteCourses.course');
    if (!updatedBasicCourseInfo) {
      throw new ErrorApp(400, 'failed to update');
    }
    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      const deletedPreRequisite = preRequisiteCourses
        .filter((elm) => elm.course && elm.isDeleted)
        .map((elm) => elm.course);
     //operation no-3
      const deletedPreRequisiteCourses = await Course.findByIdAndUpdate(id, {
        $pull: {
          preRequisiteCourses: { course: { $in: deletedPreRequisite } },
        },
      },session);
      if (!deletedPreRequisiteCourses) {
        throw new ErrorApp(400, 'falied to update course');
      }
      const newPreRequisite = preRequisiteCourses.filter(
        (elm) => elm.course && !elm.isDeleted,
      );
      // operatoin no-3
      const newPreRequisiteCourses = await Course.findByIdAndUpdate(
        id,
        {
          $addToSet: { preRequisiteCourses: { $each: newPreRequisite } },
        },
        {
          new: true,
          runValidators: true,
          session
        },
      );
      if (!newPreRequisiteCourses) {
        throw new ErrorApp(400, 'falied to update course');
      }
      const result = await Course.findById(id).populate(
        'preRequisiteCourses.course',
      );
       session.commitTransaction();
       session.endSession();
      return result;
     
    }
      session.commitTransaction();
      session.endSession();
     return updatedBasicCourseInfo;
   
  } catch (error) {
    session.abortTransaction();
    session.endSession();
    throw new ErrorApp(400,'falied to update course')
  }
 

};
const deleteCourseFromDB = async (id: string) => {
  const result = await Course.findByIdAndUpdate(
    id,
    {
      isDeleted: true,
    },
    { new: true },
  );
  return result;
};

export const courseServices = {
  createCourseInToDB,
  getAllCourseFromDB,
  getSingleCourseFromDB,
  updateCourseInToDB,
  deleteCourseFromDB,
};
