var express = require('express');
var router = express.Router();
var controller = require('../controllers/userController')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/post', controller.create);
module.exports = router;
