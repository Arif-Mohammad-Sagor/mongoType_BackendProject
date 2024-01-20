import { Router } from 'express';
import validateRequest from '../../middleweres/validateRequest';
import { loginValidationSchema } from './auth.validation';
import { authController } from './auth.controllers';

const router = Router();

router.post(
  '/auth/login',
  validateRequest(loginValidationSchema),
  authController.Login,
);


export const AuthRouter = router;
