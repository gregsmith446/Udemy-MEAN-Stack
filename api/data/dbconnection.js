var MongoClient = require('mongodb').MongoClient;
var dburl = 'mongodb://gregsmith446-firstworkspace-5563387/meanhotel';

var _connection = null;

var open = function() {
  MongoClient.connect(dburl, function(err, client) {
    if (err) {
      console.log("DB connection failed");
      return;
    }
    _connection = client.db("meanhotel");
    console.log("DB connection open", client);
  });
};

var get = function() {
  return _connection;
};

module.exports = {
  open : open,
  get : get
};

//from cliff - fixing error in video 22

// Update to dbconnecion.js file

// var dburl = 'mongodb://' + process.env.ip + ' :27017'

// MongoClient.connect(dburl, function (err, client) {

// _connection = client.db("meanhotel");
// console.log("DB connection open", client);