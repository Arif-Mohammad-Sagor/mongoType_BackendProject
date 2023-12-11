import { Model } from 'mongoose';

export interface IUser {
  firstName: string;
  lastName: string;
}

export interface IUserMethods {
  fullName(): string;
}
export type userModel = Model<IUser, IUserMethods>;
