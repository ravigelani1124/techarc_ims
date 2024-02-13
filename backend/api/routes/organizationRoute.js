const express = require('express');

const authMiddleware = require('../middleware/authMiddleware');
const organizationController = require('../controllers/organizationController');

const router = express.Router();

router.post('/addorganization', authMiddleware.authenticateToken, organizationController.addOrganization);
router.get('/getorganizations', authMiddleware.authenticateToken,  organizationController.getOrganizations);
router.get('/orgverify/:token', organizationController.verify_organization_email);
module.exports = router;