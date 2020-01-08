import express from 'express';
import ManagerAuth from '../Controller/managerController';
import { checkManagerSignUp } from '../Middleware/checkManagerSignUp';

const router = express.Router();
const mngAuth = new ManagerAuth();
router.post('/auth/signup', checkManagerSignUp, mngAuth.signUp);
// router.post('/auth/signin', checkLoginUser, mngAuth.login);
export default router;
