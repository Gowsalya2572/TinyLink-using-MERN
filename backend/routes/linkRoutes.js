const express = require('express');
const router = express.Router();
const controller = require('../controllers/linkControllers');

// API endpoints
router.post('/links', controller.createLink);
router.get('/links', controller.listLinks);
router.get('/links/:code', controller.getLinkStats);
router.delete('/links/:code', controller.deleteLink);

module.exports = router;
