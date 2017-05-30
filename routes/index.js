var express = require('express');
var router = express.Router();
var controllers = require('../app/controllers');

/* GET home page. */
// router.get('/', function(req, res, next) {
//
//   console.log(controllers.articles.list(req, res, next));
//   // req.models.Articles.find().limit(5).find(function(err,results){
//   //   console.log(results);
//   // });
//   res.render('index', {title: '沁河'});
// });
router.get("/",controllers.articles.list);


module.exports = router;
