const express = require('express');

const router = express.Router();

router.use('/api', require('./apiroutes'));

router.use(require('./htmlroutes'));

module.exports = router;
