const express = require('express');
const router = express.Router();
const televisionController = require('../controllers/televisionController');

// Définition des routes ici
router.get('/', televisionController.getIndex);
router.post('/add-tv', televisionController.postAddTv);
router.post('/update-status/:tvId', televisionController.postUpdateStatus);
router.post('/delete-tv/:tvId', televisionController.deleteTv);


module.exports = router;