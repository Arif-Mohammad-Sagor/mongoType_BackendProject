import httpStatus from 'http-status';
import ErrorApp from '../../errors/ErrorApp';
import { userModel } from '../user/user.model';
import config from '../../config';
import { createToken } from './auth.utils';

export const loginUserIntoDB = async (payload: {
  id: string;
  password: string;
}) => {
  // checking if the user is exist
  const user = await userModel.isUserExistsByCustomId(payload.id);

  if (!user) {
    throw new ErrorApp(httpStatus.NOT_FOUND, 'This user is not found !');
  }
  // checking if the user is already deleted

  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new ErrorApp(httpStatus.FORBIDDEN, 'This user is deleted !');
  }

  // checking if the user is blocked

  const userStatus = user?.status;

  if (userStatus === 'blocked') {
    throw new ErrorApp(httpStatus.FORBIDDEN, 'This user is blocked ! !');
  }

  //checking if the password is correct

  if (!(await userModel.isPasswordMatch(payload?.password, user?.password)))
    throw new ErrorApp(httpStatus.FORBIDDEN, 'Password do not matched');

  // create token and sent to the  client

  const jwtPayload = {
    userId: user.userId,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires as string,
  );

  return {
    accessToken,
    refreshToken,
  };
  
};

export const AuthServices = { loginUserIntoDB };
