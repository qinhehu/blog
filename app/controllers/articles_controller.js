module.exports = {
  list: function(req, res, next) {
    req.models.articles.find().limit(5).all(function(err, articles) {
      if (err)
        return next(err);

      var items = articles.map(function(m) {
        // if (!m.path) {
        //   var key = m.filename;
        //   m.path = policy.makeRequest(link + key);
        // }
        // console.log(m.path);
        return m.serialize();
      });
      console.log(items);

      res.send({items: items});
    });
  }
}
