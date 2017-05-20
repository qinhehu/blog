module.exports = function(db,cb){
  db.define("articles",{
    id: { type: 'serial', key:true },
    headline: String,
    subtitle: String,
    path: String,
    createdate: Date,
    lasteditdate:Date
  });
}
