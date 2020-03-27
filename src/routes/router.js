'use strict';

const express = require('express');
const multer = require('multer');

const router = express.Router();

const { uploadFile } = require('../controllers/controller.js');

const upload = multer({ dest: './data/' });

router.post('/save', upload.single('file'), uploadFile);

module.exports = router;