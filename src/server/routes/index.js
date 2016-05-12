var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.sendFile('/src/client/index.html');
});

module.exports = router;