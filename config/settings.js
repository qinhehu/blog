var settings = {
  database: {
    protocol: "mysql",
    query: {
      pool: true
    },
    // host: "39.108.96.128",
    // port: '3306',
    // database: "blog",
    // user: "blog_user",
    // password: "blog_user"

    host: "localhost",
    port: '3306',
    database: "blog",
    user: "root",
    password: "123456"
  },
  qiniu:{
    ACCESS_KEY:"XH6idex6aFNQ2D1ekX3_JEo2cPgb7wEQnZXcFksJ",
    SECRET_KEY:"CToiOE-p9eQgpSxft7odABrlN19QS1_YJGD8UW9x"
  }
};

module.exports = settings;
