module.exports = function(orm, db) {
  var categy = db.define("categy", {
    id: {
      type: 'serial',
      key: true
    },
    categy: String
  });
}
