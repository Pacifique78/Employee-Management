import express from 'express';
import Employee from '../Controller/employeeController';
import { checkToken } from '../Middleware/checkToken';
import checkEmployee from '../Middleware/checkEmployee';

const router = express.Router();
const employee = new Employee();
router.post('/api/employees', checkToken, checkEmployee, employee.addEmployee);
export default router;
