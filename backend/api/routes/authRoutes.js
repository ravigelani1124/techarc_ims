const express = require('express');

const authMiddleware = require('../middleware/authMiddleware');
const authAdminController = require('../controllers/authAdminController');
const authConsultantController = require('../controllers/authConsultantController');
const authUserController = require('../controllers/authUserController');

const router = express.Router();

//admin
router.post('/adminSignup', authAdminController.super_signup);
router.post('/adminLogin', authAdminController.super_login);
router.get('/adminverify/:token', authAdminController.verify_email);

//consultant
router.post('/consultantSignup', authMiddleware.authenticateToken, authConsultantController.consultant_signup);
router.post('/consultantLogin', authConsultantController.consultant_login);
router.post('/consultantCreatepassword', authConsultantController.create_password_consultant);
router.get('/consultantVerify/:token', authConsultantController.verify_email);

router.delete('/deleteConsultant',authMiddleware.authenticateToken, authAdminController.delete_consultant_by_admin);
router.delete('/deleteUser',authMiddleware.authenticateToken, authConsultantController.delete_user_by_consultant);
router.get('/getConsultantList', authMiddleware.authenticateToken, authConsultantController.getConsultantList);

//user
router.post('/userSignup',authMiddleware.authenticateToken, authUserController.userSignup);
router.post('/userLogin', authUserController.userLogin);
router.get('/userVerify/:token', authUserController.verifyUserEmail);
router.post('/userCreatepassword', authUserController.createPasswordUser);
router.get('/users', authMiddleware.authenticateToken, authUserController.getUserBasedOnConsultant);


module.exports = router;

