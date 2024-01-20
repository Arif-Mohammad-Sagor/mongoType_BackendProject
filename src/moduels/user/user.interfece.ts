/* eslint-disable no-unused-vars */
import { Model } from "mongoose";

export interface TUser {
  userId:string;
  password:string;
  needsChangePassword:boolean;
  role:'admin' | 'faculty' | 'student';
  status:'in-progress'| 'blocked';
  isDeleted:boolean
}

export interface UserModel extends Model<TUser>{
   isUserExistsByCustomId(id:string):Promise<TUser>;
   isPasswordMatch(plainPassword:string,hashedPassword:string):Promise<boolean>
}