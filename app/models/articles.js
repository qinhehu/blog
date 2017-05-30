module.exports = function(orm, db) {
  var articles = db.define("articles", {
    id: {
      type: 'serial',
      key: true
    },
    headline: String,
    subtitle: String,
    filename: String,
    createdate: String,
    lasteditdate: String
  },{
    methods:{
      serialize:function(){
        var article;

        if(this.article){
          article = this.article.map(function(c){return c.serialize();});
        }else{
          article = [];
        }

        return{
          id:this.id,
          headline:this.headline,
          subtitle :this.subtitle,
          filename: this.filename,
          createdate:this.createdate,
          lasteditdate:this.lasteditdate
        };
      }
    }
  });
}
