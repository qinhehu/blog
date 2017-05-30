module.exports = {
  list: function(req, res, next) {
    req.models.articles.find().limit(5).all(function (err, articles) {
      if (err) return next(err);

      var items = articles.map(function (m) {
        return m.serialize();
      });

      res.send({ items: items });
    });
  }
}
