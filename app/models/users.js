module.exports = function(db,cb){
  db.define("user", {
      id: { type: 'serial', key:true },
      name: String,
      username: String,
      password: String,
      createdate: Date,
      lastlogindate:Date
  });
}
