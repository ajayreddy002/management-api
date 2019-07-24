var express = require('express');
var router = express.Router();
var controller = require('../controllers/userController');
const loginController = require('../controllers/adminLoginController');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/post', controller.create);
router.post('/adminPost', loginController.create);
router.post('/login', loginController.index);
module.exports = router;
