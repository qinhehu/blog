var express = require('express');
var router = express.Router();
var fs = require("fs");
var path = require('path');
var qiniu = require("qiniu");
var jwt = require('jsonwebtoken');
var uuidV1 = require('uuid/v1');
var settings = require("../config/settings");

//需要填写你的 Access Key 和 Secret Key
qiniu.conf.ACCESS_KEY = settings.qiniu.ACCESS_KEY;
qiniu.conf.SECRET_KEY = settings.qiniu.SECRET_KEY;

fileName = "article.txt";

//要上传的空间
bucket = 'blog';
//上传到七牛后保存的文件名
// key = title+'.html';
//要上传文件的本地路径
filePath = path.resolve(__dirname, '..') + '/' + fileName

router.get('/', function(req, res, next) {
  try {
    var decoded = jwt.verify(req.cookies.token, 'qinhesh~!#');
    res.render('editor');
  } catch (err) {
    res.redirect('login');
  }
});

router.post('/uploadInfo', function(req, res, next) {
  console.log(settings.qiniu.ACCESS_KEY);
  console.log(settings.qiniu.SECRET_KEY);  

  content = req.body.content;
  title = req.body.title;
  imgpath = req.body.imgpath;
  summary = req.body.summary;
  tags = req.body.tags;

  key = title + '.txt';
  token = uptoken(bucket, key);
  fs.writeFile(fileName, content, function(err) {
    if (err) {
      return console.error(err);
    }
    //调用uploadFile上传
    //生成上传 Token

    uploadFile(token, title + '.txt', filePath, function(err, ret) {
      if (!err) {

        upDateDB(req, title, "", title + '.txt', imgpath, summary, tags);

        res.send("1");
        res.end();
      } else {
        // 上传失败， 处理返回代码
        console.log(err);
        res.send("0");
        res.end();
      }
      fs.unlink(fileName, function(err) {
        if (err) {
          return console.error(err);
        }
      });
    });
  });
});

//构建上传策略函数
function uptoken(bucket, key) {
  var putPolicy = new qiniu.rs.PutPolicy(bucket + ":" + key);
  return putPolicy.token();
}
//构造上传函数
function uploadFile(uptoken, key, localFile, callback) {
  var extra = new qiniu.io.PutExtra();
  qiniu.io.putFile(uptoken, key, localFile, extra, callback);
}

function upDateDB(req, headline, subtitle, filename, imgpath, summary, tags) {
  console.log(tags);
  var newRecord = {};
  newRecord.headline = headline;
  newRecord.subtitle = subtitle;
  newRecord.summary = summary;
  newRecord.filename = filename;
  newRecord.imgpath = imgpath;
  newRecord.createdate = new Date().getTime();
  newRecord.lasteditdate = new Date().getTime();
  newRecord.tags = tags.join(",");
  newRecord.guid = uuidV1();

  req.models.articles.create(newRecord, function(err, results) {
    if (err) {
      console.log(err);
    }
  });
}

module.exports = router;
