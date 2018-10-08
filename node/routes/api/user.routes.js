const express = require('express');
const asyncWrap = require('express-async-wrap');
const authenticate = require('../../middleware/authentication.middleware');
const UserController = require('../../controllers/user.controller');

const router = express.Router();

router.put('/changePassword', authenticate, asyncWrap(UserController.changePassword));

router.post('/login', asyncWrap(UserController.login));

router.post('/register', asyncWrap(UserController.register));

module.exports = router;