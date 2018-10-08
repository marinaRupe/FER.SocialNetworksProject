const express = require('express');
const asyncWrap = require('express-async-wrap');
const TestController = require('../../controllers/test.controller');

const router = express.Router();

router.get('/text', asyncWrap(TestController.getText));

module.exports = router;