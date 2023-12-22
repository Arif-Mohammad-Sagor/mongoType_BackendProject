import httpStatus from 'http-status';
import ErrorApp from '../../errors/ErrorApp';
import { TSemesterRegistration } from './academicRegistration.interface';
import { SemesterRegistrationModel } from './academicRegistration.model';
import { academicSemesterModel } from '../academicSemester/academicSemester.model';
import QueryBuilder from '../../builder/BuilderQuery';
import { semesterRegistration } from './academicRegistration.constant';

const createRegistrationSemesterIntoDB = async (
  payload: TSemesterRegistration,
) => {
  const isThereAnyUpcomingOrOngoingSemester =
    await SemesterRegistrationModel.findOne({
      $or: [
        { status: semesterRegistration.UPCOMING },
        { status: semesterRegistration.ONGOING },
      ],
    });
  if (isThereAnyUpcomingOrOngoingSemester) {
    throw new ErrorApp(
      httpStatus.BAD_REQUEST,
      `There is already an ${isThereAnyUpcomingOrOngoingSemester.status} semester is going on`,
    );
  }
  const academicSemester = payload.academicSemester;

  const isAcademicSemesterExists = await academicSemesterModel.findById({
    _id: academicSemester,
  });
  if (!isAcademicSemesterExists) {
    throw new ErrorApp(httpStatus.NOT_FOUND, 'Academic semester do not exist');
  }

  const isSemesterRegistrationExists = await SemesterRegistrationModel.findOne({
    academicSemester,
  });
  if (isSemesterRegistrationExists) {
    throw new ErrorApp(httpStatus.CONFLICT, 'Semester already registered');
  }

  const result = await SemesterRegistrationModel.create(payload);
  return result;
};
const getAllRegisterSemesterFromDB = async (query: Record<string, unknown>) => {
  const SemesterRegisterQuery = new QueryBuilder(
    SemesterRegistrationModel.find().populate('academicSemester'),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await SemesterRegisterQuery.queryModel;
  return result;
};

const getSignleRegisterSemesterFromDB = async (id: string) => {
  const result = await SemesterRegistrationModel.findById(id);
  return result;
};

const updateRegisterSemesterIntoDB = async (
  id: string,
  payload: Partial<TSemesterRegistration>,
) => {
  const requestedSemester = await SemesterRegistrationModel.findById(id);
  if (!requestedSemester) {
    throw new ErrorApp(httpStatus.NOT_FOUND, 'There is no Semester Registered');
  }
  const currentSemesterStatus = requestedSemester.status;
  const requestedStatus = payload?.status;
  if (currentSemesterStatus === semesterRegistration.CLOSED) {
    throw new ErrorApp(
      httpStatus.BAD_REQUEST,
      'You can not update this registered Semester',
    );
  }

  if (
    currentSemesterStatus === semesterRegistration.UPCOMING &&
    requestedStatus === semesterRegistration.CLOSED
  ) {
    throw new ErrorApp(
      httpStatus.BAD_REQUEST,
      'This is not possible to update upcoming status into end',
    );
  }
  if (
    currentSemesterStatus === semesterRegistration.ONGOING &&
    requestedStatus === semesterRegistration.UPCOMING
  ) {
    throw new ErrorApp(
      httpStatus.BAD_REQUEST,
      'This is not possible to update ongoing status into upcoming',
    );
  }
  const result = await SemesterRegistrationModel.findByIdAndUpdate(
    id,
    payload,
    { new: true, runValidators: true },
  );
  return result;
};
const deleteRegisterSemesterIntoDB = (id: string) => {};

export const semesterRegistrationSevices = {
  createRegistrationSemesterIntoDB,
  getAllRegisterSemesterFromDB,
  getSignleRegisterSemesterFromDB,
  updateRegisterSemesterIntoDB,
  deleteRegisterSemesterIntoDB,
};
