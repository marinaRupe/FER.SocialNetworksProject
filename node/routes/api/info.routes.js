const express = require('express');
const asyncWrap = require('express-async-wrap');
const AppInfoController = require('../../controllers/appinfo.controller');

const router = express.Router();

router.get('/info', asyncWrap(AppInfoController.getAppInfo));


module.exports = router;
