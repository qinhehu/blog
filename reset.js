var models = require('./app/models/');

models(function(err, db) {
  if (err)
    throw err;

  db.drop(function(err) {
    if (err)
      throw err;

    db.sync(function(err) {
      if (err)
        throw err;

      console.log("Done!");

    });
  });
});
