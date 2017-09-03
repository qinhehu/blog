module.exports = {
  list: function(req, res, next, offset) {
    console.log(offset);
    req.models.articles.find().order("createdate","Z").offset(offset*3).limit(3).all(function(err, articles) {

      if (err)
        return next(err);

      var items = articles.map(function(m) {
        return m.serialize();
      });
      console.log(items);

      res.send({items: items});
    });
  },
  count: function(req, res, next) {
    req.models.articles.count(function(err, size) {
      if (err)
        return next(err);
      res.send({count: size,index:0});
    });
  }
}
