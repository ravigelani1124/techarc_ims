const express = require('express');

const authMiddleware = require('../middleware/authMiddleware');
const authSuperController = require('../controllers/authSuperController');
const authConsultantController = require('../controllers/authConsultantController');

const router = express.Router();

router.post('/superSignup', authSuperController.super_signup);
router.post('/superLogin', authSuperController.super_login);
router.get('/superVerify/:token', authSuperController.verify_email);
router.post('/consultantSignup', authConsultantController.consultant_signup);
router.post('/consultantLogin', authConsultantController.consultant_login);
router.post('/consultantCreatepassword', authConsultantController.create_password_consultant);
router.get('/consultantVerify/:token', authConsultantController.verify_email);
router.delete('/deleteConsultant',authMiddleware.authenticateToken, authSuperController.delete_consultant_by_admin);
router.delete('/deleteUser',authMiddleware.authenticateToken, authConsultantController.delete_user_by_consultant);

module.exports = router;

