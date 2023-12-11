import { Router } from 'express';
import validateRequest from '../../middleweres/validateRequest';
import { courseValidations } from './course.validatoin';
import { coursesControllers } from './course.controller';

const router = Router();

router.post(
  '/create-course',
  validateRequest(courseValidations.CreatecourseValidationSchema),
  coursesControllers.createCourse,
);

router.get('/all-course', coursesControllers.getAllCourse);

router.get('/single-course/:id', coursesControllers.getSingleCourse);

router.patch(
  '/update-course/:id',
  validateRequest(courseValidations.updateCourseValidationSchema),
  coursesControllers.updateCourse,
);
router.delete('/delete-course/:id', coursesControllers.deleteSingleCourse);
export const courseRouter = { router };
