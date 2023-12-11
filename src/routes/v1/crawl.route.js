const express = require('express');
const crawlController = require('../../controllers/crawl.controller');
const router = express.Router();

router.get('/word', crawlController.crawlWord);

module.exports = router;
