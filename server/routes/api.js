const router = require('express').Router();
const searchedController = require('./../controllers/searched.controller');

router.post('/top-searched', searchedController.addSearched);

router.get('/top-searched', searchedController.getTopSearches);

module.exports = router;
