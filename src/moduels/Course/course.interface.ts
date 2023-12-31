import { Types } from "mongoose";

export type TpreRequisiteCourese = {
  course: Types.ObjectId;
  isDeleted: boolean;
};
export type TCourse = {
  title: string;
  prefix: string;
  code: number;
  credits: number;
  isDeleted?:boolean;
  preRequisiteCourses: TpreRequisiteCourese[];
};
