import { Router } from 'express';
import { acadFacultyControllers } from './acadFaculty.controllers';
import validateRequest from '../../middleweres/validateRequest';
import {createAcadFacultyValicationSchema, updateAcadFacultyValicationSchema } from './acadFaculty.validation';

const router = Router();

router.post(
  '/create-acad-faculty',
  validateRequest(createAcadFacultyValicationSchema),
  acadFacultyControllers.createAcadFacultyIntoDB,
);

router.get(
  '/all-acad-faculty', 
  acadFacultyControllers.getAllAcadFacultyFromDB);

router.get(
  '/single-acad-faculty/:facultyId',
  acadFacultyControllers.getSingleAcadFacultyFromDB,
);
router.patch(
  '/update-acad-faculty/:facultyId',validateRequest(updateAcadFacultyValicationSchema),
  acadFacultyControllers.upateSingleAcadFacultyFromDB,
);

export const acadFacultyRouter = router;
