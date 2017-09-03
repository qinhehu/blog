module.exports = function(orm, db) {
  var users = db.define("users", {
    id: {
      type: 'serial',
      key: true
    },
    name: String,
    username: String,
    password: String,
    createdate: String,
    lastlogindate: String
  });
}
