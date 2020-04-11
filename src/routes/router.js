'use strict';

const express = require('express');
const multer = require('multer');
const { uploadFile, listVehicles } = require('../controllers/vehicle.js');

const router = express.Router();

router.get('/vehicle/list', listVehicles);

const upload = multer({ dest: './data/' });
router.post('/vehicle/upload', upload.single('file'), uploadFile);

module.exports = router;