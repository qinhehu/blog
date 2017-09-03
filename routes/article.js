var express = require('express');
var router = express.Router();
var qiniu = require("qiniu");
var url = require('url');

//构建私有空间的链接
link = 'http://opz7jf7ut.bkt.clouddn.com/';
var policy = new qiniu.rs.GetPolicy();

router.get('/', function(req, res, nexrt) {
  res.redirect('/');
});

router.get('/:id', function(req, res, next) {

  response = {
    guid: req.params.id
  };

  req.models.articles.find(response, function(err, results) {
    if (err) {
      return res.send(err);
    }

    var filepath = results[0].filename;
    var downloadUrl = policy.makeRequest(link + filepath);
    console.log(downloadUrl);

    res.render('article', {data: downloadUrl});
  });

});

module.exports = router;
