import express from 'express';
import { registerController, loginController, testController } from '../controllers/authController.js';
import { isAdmin, requireSignin } from '../middlewares/authMiddleware.js';

//route object
const router = express.Router();

//routing
// REGISTER || METHOD: POST 
router.post('/register', registerController);

//LOGIN || METHOD: POST
router.post('/login', loginController);

//test route
router.get('/test',requireSignin, isAdmin, testController);


export default router;