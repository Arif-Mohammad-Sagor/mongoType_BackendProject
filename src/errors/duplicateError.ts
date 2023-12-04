import { TErrorSources, TGenericErrorResponse } from "../interfaces/errors";

export const handleDuplicateError =(err:any):TGenericErrorResponse=>{
  // Extract value within double quotes using regex
  const match = err.message.match(/"([^"]*)"/);
  // The extracted value will be in the first capturing group
  const extractedMessage= match && match[1];

  const errorSources:TErrorSources=[
    {
      path: '',
      message:`${extractedMessage} already exits ! `
    }
  ]
  return {
    statusCode: 400,
    message: 'Invalid Id',
    errorSources,
  };
}