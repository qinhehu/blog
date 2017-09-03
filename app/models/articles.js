module.exports = function(orm, db) {
  var articles = db.define("articles", {
    id: {
      type: 'serial',
      key: true
    },
    headline: String,
    subtitle: String,
    summary: String,
    filename: String,
    imgpath: String,
    createdate: String,
    lasteditdate: String,
    tags: String,
    guid: String
  }, {
    methods: {
      serialize: function() {
        var article;

        if (this.article) {
          article = this.article.map(function(c) {
            return c.serialize();
          });
        } else {
          article = [];
        }

        return {
          id: this.id,
          headline: this.headline,
          subtitle: this.subtitle,
          summary: this.summary,
          filename: this.filename,
          imgpath: this.imgpath,
          createdate: this.createdate,
          lasteditdate: this.lasteditdate,
          tags: this.tags,
          guid: this.guid
        };
      }
    }
  });
}
