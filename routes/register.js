var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('register');
});

router.post('/', function(req, res, next) {

    var newRecord = {};
    newRecord.name = "admin";
    newRecord.username = req.body.account;
    newRecord.password = req.body.password;
    newRecord.createdate = new Date();
    req.models.users.create(newRecord, function(err, results) {
        if (err) {
            return next(err);
        }

        return res.send(200);
    });

    // response = {
    //     account: req.body.account,
    //     password: req.body.password
    // };
    // res.send(response);
});

module.exports = router;
