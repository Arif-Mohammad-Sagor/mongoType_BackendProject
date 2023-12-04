/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import { TErrorSources } from '../interfaces/errors';
import { handleZodError } from '../errors/zodError';
import config from '../config';
import { handleValidationError } from '../errors/validatorError';
import { handleCastError } from '../errors/castError';
import { handleDuplicateError } from '../errors/duplicateError';
import ErrorApp from '../errors/ErrorApp';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = err.message || 'Something went wrong!';
  let errorSources: TErrorSources = [
    { path: '', message: 'Something went wrong' },
  ];

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (err?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  }else if(err?.name==='CastError'){
    const simplifiedError = handleCastError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  }else if(err?.code===11000){
    const simplifiedError= handleDuplicateError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  }else if(err instanceof ErrorApp){
    statusCode=err.statusCode;
    message=err.message;
    errorSources=[{
      path:'',
      message:err?.message
    }]
  }else if(err instanceof Error){
 message = err.message;
 errorSources = [
   {
     path: '',
     message: err?.message,
   },
 ];
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    err,
    stack: config.node_dev === 'development' ? err?.stack : null,
  });
};
export default globalErrorHandler;
