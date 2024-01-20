import config from '../../config';
import catchAsync from '../../utils/catchAsync';
import { AuthServices } from './auth.services';

export const Login = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUserIntoDB(req.body);
  const { refreshToken, accessToken } = result;

  res.cookie('refreshToken', refreshToken, {
    secure: config.node_dev === 'production',
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: 'User is logged in succesfully!',
    data: {
      accessToken,
    },
  });
});

export const authController = { Login };
