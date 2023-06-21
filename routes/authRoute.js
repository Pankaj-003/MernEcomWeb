import express from 'express'
import {
    registerController,
    loginController,
    testController,
    forgotPasswordController,
    updateProfileController,
}
    from '../controllers/authController.js';
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
//router object
const router = express.Router()

//routing
//REGISTER || METHOD POST
router.post('/register', registerController);

//LOGIN || POST
router.post('/login', loginController);

//forgot password || POST
router.post('/forgot-password', forgotPasswordController)

//test
router.get("/test", requireSignIn, isAdmin, testController);

//protected User route Auth
router.get('/user-auth', requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
});

//protected Admin route Auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
});

//Update Profile
router.put('/profile', requireSignIn, updateProfileController);
export default router;

