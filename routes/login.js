var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

router.get('/', function(req, res, next) {
    res.clearCookie('token');
    res.render('login');
});

router.post('/', function(req, res, next) {
    response = {
        username: req.body.account,
        password: req.body.password
    };

    req.models.users.exists(response, function(err, results) {
        if (err) {
            return res.send(err);
        }
        console.log(results);
        if(results){
          var token = jwt.sign({ username: req.body.account }, 'qinhesh~!#',{ expiresIn: '10h' }  );

          res.cookie('token',token);
          return res.redirect('editor');
        }
        res.send(response);
    });
});

module.exports = router;
