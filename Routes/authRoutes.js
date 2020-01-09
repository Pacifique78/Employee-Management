import express from 'express';
import ManagerAuth from '../Controller/managerController';
import checkManagerSignUp from '../Middleware/checkManagerSignUp';
import checkManagerSignIn from '../Middleware/checkManagerSingIn';
import { checkToken } from '../Middleware/checkToken';

const router = express.Router();
const mngAuth = new ManagerAuth();
router.post('/auth/signup', checkManagerSignUp, mngAuth.signUp);
router.post('/auth/signin', checkManagerSignIn, mngAuth.login);
router.get('/auth/confirmation/:token', checkToken, mngAuth.confirm);
export default router;
