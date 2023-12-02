import { Router } from 'express';
import { allAcademicSemester, createAcademicSemesterController, singleAcademicSemester, updateSignleAcademicSemester } from './academicSemester.controller';
import validateRequest from '../../middleweres/validateRequest';
import { createAcademicSemesterValidationSchema } from './academicSemester.validation';

const router = Router();

router.post(
  '/create-academic-semester',
  validateRequest(createAcademicSemesterValidationSchema),
  createAcademicSemesterController,
);
router.get('/all-academic-semesters',allAcademicSemester)
router.get('/academic-semester/:id', singleAcademicSemester);
router.patch('/academic-semester/:id',updateSignleAcademicSemester)
export const academicRouter = router;
