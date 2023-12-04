import mongoose from "mongoose";
import { TErrorSources } from "../interfaces/errors";

export const handleCastError = (err:mongoose.Error.CastError)=>{

const errorSources: TErrorSources = [
  {
    path: err.path,
    message: err.message,
  },
];

  return {
   statusCode: 400,
   message: 'Invalid Id',
   errorSources,
 };

  }
