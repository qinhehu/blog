var orm = require("orm");
var settings = require("../../config/settings");

var connection =null;

function setUp(db,cb){
  require('./articles')(orm,db);
  require('./users')(orm,db);

  return cb(null,db);
}

module.exports = function(cb){
  if(connection) return cb(null,connection);

  orm.connect(settings.database,function(err,db){
    if(err) return cb(err);

    connection = db;
    db.settings.set('instance.returnAllErrors', true);
    setUp(db,cb)
  });
}
