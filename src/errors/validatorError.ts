import mongoose from "mongoose"
import { TErrorSources, TGenericErrorResponse } from "../interfaces/errors"
export const handleValidationError=(err:mongoose.Error.ValidationError):TGenericErrorResponse=>{

const errorSources: TErrorSources =Object.values(err).map((val:mongoose.Error.ValidatorError | mongoose.Error.CastError)=>{
  return {
    path:val?.path,
    message:val?.message
  }
})
 return {
   statusCode: 400,
   message: 'Zod validator Error',
   errorSources,
 };

}