export interface IUser {
  userId:string;
  password:string;
  needsChangePassword:boolean;
  role:'admin' | 'faculty' | 'student';
  status:'in-progress'| 'blocked';
  isDeleted:boolean
}
