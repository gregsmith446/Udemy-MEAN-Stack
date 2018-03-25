var mongoose = require('mongoose');
var Hotel = mongoose.model('Hotel');

//this module is working well
module.exports.hotelsGetAll = function(req, res) {
    
    console.log('GET all hotels');
    console.log(req.query);
    
    var offset = 0;
    var count = 5;
    var maxCount = 10;
    
    //sets up our pagination with 2 if statements
    if (req.query && req.query.offset) { //makes the request data (offset) an integer
        offset = parseInt(req.query.offset, 10);
    }
    if (req.query && req.query.count) { //makes the request data (count) an integer
        count = parseInt(req.query.count, 10);
    }
    
    //if offset and count are not numbers supply the 400 status and json message
    if (isNaN(offset) || isNaN(count)) { //if both offset and count are numbers - continue 
        res
            .status(400)
            .json({
            "message" : "If supplied in querystring, count and offset must be numbers"        
            });
        return;
    }
    
    //if user requests more than is allowed, send 400 (bad request) + json message
    if (count > maxCount) { 
        res
        .status(400)
        .json({ "message" : "Count limit of " + maxCount + " exceeded" 
        });
    return;    
    }
    
    Hotel 
    .find()
    .skip(offset)
    .limit(count)
    .exec(function(err, hotel) {
        if(err) { //if there is error, console log and send 500 status error + err data in JSON
            console.log("Error finding hotels");
            res
            .status(500) //internal server error
            .json(err); //the error msg in json format
        } else {
        console.log("Found hotels", hotel.length);
        res
            .json(hotel);
        }
    });
};

//can't seem to get only 1 hotel to return by its ID without crashing app
module.exports.hotelsGetOne = function(req, res) {
    var hotelId = req.params.hotelId;
    console.log("GET hotelId", hotelId);
    
    Hotel
        .findById(hotelId) //find the specified hotel (from the params sent)
        .exec(function(err, doc) { //responds with error or the document with 200 status code 
            var response = {
                status : 200,
                message : doc
            };
            if(err) { //if there is error, console log and send 500 status error + err data in JSON
                console.log("Error finding hotel");
                response.status = 500; //internal server error
                response.message = err; //the error msg in json format
            } else if(!doc) { //or if if the doc is empty/doesn't exist
                response.status = 404;
                response.message = {
                    "message" : "Hotel ID not found"
            };
            res
                .status(response.status)
                .json(response.message);
            } 
        });
};        

var _splitArray = function(input) { //helper method
    var output; //takes input gives output
    if (input && input.length > 0) { // if input exists and has length>0
        output = input.split(";"); //split it on a semicolon
    } else {
        output = []; // else return empty array
    }
    return output;
}

module.exports.hotelsAddOne = function(req, res) {
    
    Hotel //model with method chained to it
        .create({ //contains the data to be added to DB
            name : req.body.name,
            description : req.body.description,
            stars : parseInt(req.body.stars, 10),
            services : _splitArray(req.body.services),
            photos : _splitArray(req.body.photos),
            currency : req.body.currency,
            location : {
                address : req.body.address,
                coordinates : [
                    parseFloat(req.body.lng),
                    parseFloat(req.body.lat)
                    ]
            }
        }, function(err, hotel) { //2 paramaters (err, new doc from DB), will run when create method completed
            if (err) {
                console.log("Error creating hotel");
                res
                    .status(400) //bad request
                    .json( err ) //return error object
            } else {
                console.log("Hotel created", hotel);
                res
                    .status(201) //resources created
                    .json( hotel ); //new hotel data
            }
        });
}; 

module.exports.hotelsUpdateOne = function(req, res) {
    var hotelId = req.params.hotelId;
    console.log("GET hotelId", hotelId);
    
    Hotel
        .findById(hotelId) //find the specified hotel (from the params sent)
        .select("-reviews -rooms") //excludes these 2 subdocuments
        .exec(function(err, doc) { //responds with error or the document with 200 status code 
            var response = {
                status : 200,
                message : doc
            };
            if(err) { //if there is error, console log and send 500 status error + err data in JSON
                console.log("Error finding hotel");
                response.status = 500; //internal server error
                response.message = err; //the error msg in json format
            } else if(!doc) { //or if if the doc is empty/doesn't exist
                response.status = 404;
                response.message = {
                    "message" : "Hotel ID not found"
                };
            }
            // if status no longer == 200, this comes into play
            if (response.status !== 200) { //if the status is changed from 200, update
             res
                .status(response.status)
                .json(response.message);
            } else {
                doc.name = req.body.name;
                doc.description = req.body.description,
                doc.stars = parseInt(req.body.stars, 10),
                doc.services = _splitArray(req.body.services),
                doc.photos = _splitArray(req.body.photos),
                doc.currency = req.body.currency,
                doc.location = {
                    address : req.body.address,
                    coordinates : [
                    parseFloat(req.body.lng),
                    parseFloat(req.body.lat)
                    ]
                };
                //save our newly updated document
                doc.save(function(err, hotelUpdated) {
                    if(err) { //if cannot save, 
                        res // 500 status error and the error in JSON format
                            .status(500)
                            .json(err);
                    } else { // if can save
                        res
                            .status(204) //success new post
                            .json(); //empty () because nothing in JSON at this time
                    }
                });
            }
        });
};

module.exports.hotelsDeleteOne = function(req, res) {
  var hotelId = req.params.hotelId;

  Hotel
    .findByIdAndRemove(hotelId)
    .exec(function(err, location) {
      if (err) {
        res
          .status(404)
          .json(err);
      } else {
        console.log("Hotel deleted, id:", hotelId);
        res
          .status(204)
          .json();        
      }
    });
};