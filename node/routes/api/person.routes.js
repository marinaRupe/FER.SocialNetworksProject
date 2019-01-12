const express = require('express');
const asyncWrap = require('express-async-wrap');
const PersonController = require('../../controllers/person.controller');

const router = express.Router();

router.get('/:personId', asyncWrap(PersonController.getPersonDetails));

module.exports = router;
