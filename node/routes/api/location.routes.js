const express = require('express');
const asyncWrap = require('express-async-wrap');
const LocationController = require('../../controllers/location.controller');

const router = express.Router();

router.get('/find', asyncWrap(LocationController.findLocation));

module.exports = router;
