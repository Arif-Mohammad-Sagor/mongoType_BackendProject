import { Router } from 'express';
import { facultyController } from './faculty.controller';

const router = Router();

router.get('/faculty', facultyController.getAllFaculty);

export const facultyRotuer = router;
