import { Router } from 'express';
import { createAcademicSemesterController } from './academicSemester.controller';
import validateRequest from '../../middleweres/validateRequest';
import { createAcademicSemesterValidationSchema } from './academicSemester.validation';

const router = Router();

router.post(
  '/create-academic-semester',
  validateRequest(createAcademicSemesterValidationSchema),
  createAcademicSemesterController,
);

export const academicRouter = router;