import {
  TAcademicSemesterCodes,
  TAcademicSemesterNameCodeMapper,
  TAcademicSemesterNames,
  TMonths,
} from './academicSemester.interface';

export const Months: TMonths[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
// these staffs are optional thing i guess
export const academicSemesterNames: TAcademicSemesterNames[] = [
  'Autumn',
  'Summer',
  'Fall',
];
export const academicSemesterCodes: TAcademicSemesterCodes[] = [
  '01',
  '02',
  '03',
];
export const academicSemesterNameCodeMapper: TAcademicSemesterNameCodeMapper = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
};
