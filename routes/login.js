var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('login');
});

router.post('/', function(req, res, next) {
    response = {
        username: req.body.account,
        password: req.body.password
    };
    // res.send(response);
    req.models.User.count(response, function(err, results) {
        if (err) {
            return res.send(err);
        }
        if (results > 0) {
            return res.redirect('dashboard');
        }
        // res.send(JSON.stringify(users));
        res.send(response);
    });
});

module.exports = router;
