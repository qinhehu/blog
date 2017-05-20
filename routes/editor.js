var express = require('express');
var router = express.Router();
var fs = require("fs");
var path = require('path');
var qiniu = require("qiniu");

//需要填写你的 Access Key 和 Secret Key
qiniu.conf.ACCESS_KEY = '';
qiniu.conf.SECRET_KEY = '';

fileName = "article.html";

//要上传的空间
bucket = 'blog';
//上传到七牛后保存的文件名
// key = title+'.html';
//构建上传策略函数
function uptoken(bucket, key) {
  var putPolicy = new qiniu.rs.PutPolicy(bucket + ":" + key);
  return putPolicy.token();
}

//要上传文件的本地路径
filePath = path.resolve(__dirname, '..') + '/' + fileName
//构造上传函数
function uploadFile(uptoken, key, localFile, callback) {
  var extra = new qiniu.io.PutExtra();
  qiniu.io.putFile(uptoken, key, localFile, extra,callback);
}

router.get('/', function(req, res, next) {
  res.render('editor');
});

router.post('/jquerytest', function(req, res, next) {
  content = req.body.content;
  title = req.body.title;

  key = title+'.html';
  token = uptoken(bucket, key);
  fs.writeFile(fileName, content, function(err) {
    if (err) {
      return console.error(err);
    }
    //调用uploadFile上传
    //生成上传 Token

    uploadFile(token, title+'.html', filePath, function(err, ret) {
      if (!err) {
        // 上传成功， 处理返回值
        console.log(ret.hash, ret.key, ret.persistentId);
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

module.exports = router;
