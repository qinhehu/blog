var express = require('express');
var router = express.Router();
var controllers = require('../app/controllers');
var qiniu = require("qiniu");
var url = require('url');
var http = require('http');

router.get('/', function(req, res, next) {
  res.render('index', {title: '沁河'});
});

router.get('/getArticle/:pageNum', function(req, res, next) {
  pageNum = req.params.pageNum;

  controllers.articles.list(req, res, next, pageNum);
});

router.get('/getArticleSize', controllers.articles.count);

module.exports = router;
