import { Types } from "mongoose"

export type TSemesterRegistration = {
  academicSemester:Types.ObjectId,
  status:'UPCOMING'|'ONGOING'|'CLOSED',
  startDate:Date,
  endDate:Date,
  minCredit:number,
  maxCredit:number
}
