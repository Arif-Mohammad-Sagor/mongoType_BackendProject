import { Router } from "express";
import { AcadDepartmentControllers } from "./acadDept.controllers";
import validateRequest from "../../middleweres/validateRequest";
import { createAcadDeptValidationSchema, updateAcadDeptValidationSchema } from "./acadDept.validation";


const router = Router();

router.post('/create-dept',
validateRequest(createAcadDeptValidationSchema)
,AcadDepartmentControllers.createDeptIntoDB);

router.get('/all-dept',AcadDepartmentControllers.getAllDeptFromDB)

router.get('/single-dept/:deptId',AcadDepartmentControllers.getSingleDeptFromDB);

router.patch('/update-single-dept/:deptId',
validateRequest(updateAcadDeptValidationSchema)
,AcadDepartmentControllers.updateSingleDeptFromDB)

export const departmentRouter = router;