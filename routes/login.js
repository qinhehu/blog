var express = require('express');
var router = express.Router();

router.get('/',function(req,res,next){
  res.render('login');
});

router.post('/',function(req,res,next){
  response = {
       account:req.body.account,
       password:req.body.password
   };
  res.send(response);
});

module.exports =router;
