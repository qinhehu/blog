var express = require('express');
var router = express.Router();
var controllers = require('../app/controllers');
var qiniu = require("qiniu");
var url = require('url');
var http = require('http');

//构建私有空间的链接
link = '';
var policy = new qiniu.rs.GetPolicy();



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {title: '沁河'});
});
// router.get("/", controllers.articles.list);

router.get('/getArticle', controllers.articles.list);

router.get('/getDownloadURl',function(req, res, next){
  console.log("123");
  var params = url.parse(req.url, true).query;
  var key = params.key;
  var downloadUrl = policy.makeRequest(link + key);
  res.send(downloadUrl);
});

module.exports = router;
