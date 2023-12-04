/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import { TErrorSources } from '../interfaces/errors';
import { handleZodError } from '../errors/zodError';
import config from '../config';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {

  let statusCode = 500;
  let message = err.message || 'Something went wrong!';
  let errorSources:TErrorSources = [{ path: '', message: 'Something went wrong' }];

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources=simplifiedError?.errorSources;
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    stack:config.node_dev==='development'? err?.stack:null
  });
};
export default globalErrorHandler;
