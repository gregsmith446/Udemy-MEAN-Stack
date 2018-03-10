var dbconn = require('../data/dbconnection.js');
var objectId = require('mongodb').objectId;

var hotelData = require('../data/hotel-data.json');

module.exports.hotelsGetAll = function(req, res) {
    
    var db = dbconn.get();
    
    var offset = 0;
    var count = 5;
    
    var collection = db.collection('hotel');
    console.log(collection);
    
    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10);
    }
    if (req.query && req.query.count) {
        count = parseInt(req.query.count, 10);
    }   
   
    collection
    .find()
    .skip(offset)
    .limit(count)
    .toArray(function(err, docs) {
     console.log("found hotels", docs.length);
    res
        .status(200)
        .json(docs);    
    });
};

module.exports.hotelsGetOne = function(req, res) {
    var db = dbconn.get();
    var id = req.params.hotelId;
    var collection = db.collection('hotel');
    console.log("GET hotelId", id);
    
    collection
        .findOne({
            _id: objectId(id)
        }, function(err, doc) {
            res
                .status(200)
                .json(doc);
        });
};

module.exports.hotelsAddOne = function(req, res) {
    var db = dbconn.get();
    var collection = db.collection('hotel');
    var newHotel;

    console.log("POST new hotel");
    
    //if all 3 of these items exist, we have success status and consolelog
    if (req.body && req.body.name && req.body.stars) {
        newHotel = req.body;
        newHotel.stars = parseInt(req.body.stars, 10);
        collection.insertOne(newHotel, function(err, response) {
        console.log(response);
        console.log(response.ops);
        res
            .status(201)
            .json(response.ops);       
        });
    } else { //if data is missing
        console.log("Data missing from body");
        res
            .status(400) // 400 is bad request
            .json({ message : "Required message missing from body" });
    }
};   
    
    
    
    
    
   