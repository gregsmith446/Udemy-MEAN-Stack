var mongoose = require('mongoose');  //require mongoose
var Hotel = mongoose.model('Hotel'); //require the Hotel DB in mongo via mongoose

// GET all reviews for a hotel, by ID (subdocument)
module.exports.reviewsGetAll = function(req, res) {
    var id = req.params.hotelId;
    console.log("GET hotelId", id);
    
    Hotel
        .findById(id) //find the specified hotel (from the params sent)
        .select('reviews') //return only the review, not the whole hotel as well
        .exec(function(err, doc) { //once query is exec, responds with error or the doc with 200 status code 
            var response = {
                status : 200,
                message : []
            }; 
            if (err) {
                console.log("Error finding hotel");
                response.status = 500;
                response.message = err;
            } else if(!doc) {
                response.status = 404;
                response.message = {
                    "message" : "Hotel ID not found " + id
                };
            } else {
                response.message = doc.reviews ? doc.reviews : [];
            }
            res
                .status(response.status)
                .json(response.message); //returns as json data - the reviews
        });
};

// GET single review for a hotel, by ID
module.exports.reviewsGetOne = function(req, res) {
    var hotelId = req.params.hotelId;
    var reviewId = req.params.reviewId;
    console.log("GET reviewId" + reviewId + " for hotelId" + hotelId);
    
    Hotel
        .findById(hotelId)
        .select('reviews')
        .exec(function(err, hotel) {
             var response = {
                status : 200,
                message : {}
            };
            if (err) {
                console.log("Error finding hotel");
                response.status = 500;
                response.message = err;
            } else if(!hotel) {
            console.log("Hotel id not found in database", hotelId);
            response.status = 404;
            response.message = {
                "message" : "Hotel ID not found " + hotelId
            };
            } else {
            // Get the review
            response.message = hotel.reviews.id(reviewId);
            // If the review doesn't exist Mongoose returns null
            if (!response.message) {
                response.status = 404;
                response.message = {
                "message" : "Review ID not found " + reviewId
                };
            }
      }
      res
        .status(response.status)
        .json(response.message);
    });
};

var _addReview = function(req, res, hotel) { //pushing our review array into the model instance
    hotel.reviews.push({
        name : req.body.name,
        rating : parseInt(req.body.rating, 10),
        review : req.body.review
    });
    
    hotel.save(function(err, hotelUpdated) {
        if (err) {
            res
                .status(500)
                .json(err);
        } else {
            res
                .status(201)
                .json(hotelUpdated.reviews(hotelUpdated.reviews.length - 1));
        }   
    });
};

module.exports.reviewsAddOne = function(req, res) {
    var id = req.params.hotelId;
    console.log("GET hotelId", id);
    
    Hotel
        .findById(id) //find the specified hotel (from the params sent)
        .select('reviews') //return only the review, not the whole hotel doc
        .exec(function(err, doc) { //once query is exec, responds with error or the doc with 200 status code 
            //begin error trapping
            var response = {
                status : 200,
                message : []
            }; 
            if (err) {
                console.log("Error finding hotel");
                response.status = 500;
                response.message = err;
            } else if(!doc) {
                response.status = 404;
                response.message = {
                    "message" : "Hotel ID not found " + id
                };
            }
            //end error trapping
            if (doc) { //if there is a doc, we call this function 
                _addReview(req, res, doc); //req, res, doc passed as objects
            } else { //if no doc
            res
                .status(response.status) //return with the message from error trapping
                .json(response.message);
            }    
        });
};

module.exports.reviewsUpdateOne = function(req, res) {
    var hotelId = req.params.hotelId;
    var reviewId = req.params.reviewId;
    console.log('PUT reviewId ' + reviewId + ' for hotelId ' + hotelId);

  Hotel
    .findById(hotelId)
    .select('reviews')
    .exec(function(err, hotel) {
      var thisReview;
      var response = {
        status : 200,
        message : {}
      };
      if (err) {
        console.log("Error finding hotel");
        response.status = 500;
        response.message = err;
      } else if (!hotel) {
        console.log("Hotel id not found in database", id);
        response.status = 404;
        response.message = {
          "message" : "Hotel ID not found " + id
        };
      } else {
        // Get the review
        thisReview = hotel.reviews.id(reviewId);
        // If the review doesn't exist Mongoose returns null
        if (!thisReview) {
          response.status = 404;
          response.message = {
            "message" : "Review ID not found " + reviewId
          };
        }
      }
      if (response.status !== 200) {
        res
          .status(response.status)
          .json(response.message);
      } else {
        thisReview.name = req.body.name;
        thisReview.rating = parseInt(req.body.rating, 10);
        thisReview.review = req.body.review;
        hotel.save(function(err, hotelUpdated) {
          if (err) {
            res
              .status(500)
              .json(err);
          } else {
            res
              .status(204)
              .json();
          }
        });
      }
    });
};

module.exports.reviewsDeleteOne = function(req, res) {
    var hotelId = req.params.hotelId;
    var reviewId = req.params.reviewId;
    console.log('PUT reviewId ' + reviewId + ' for hotelId ' + hotelId);

    Hotel
    .findById(hotelId)
    .select('reviews')
    .exec(function(err, hotel) {
        var thisReview;
        var response = {
            status : 200,
            message : {}
      };
    if (err) {
        console.log("Error finding hotel");
        response.status = 500;
        response.message = err;
    } else if (!hotel) {
        console.log("Hotel id not found in database", hotelId);
        response.status = 404;
        response.message = {
            "message" : "Hotel ID not found " + hotelId
        };
      } else {
        // Get the review
        thisReview = hotel.reviews.id(reviewId);
        // If the review doesn't exist Mongoose returns null
        if (!thisReview) {
            response.status = 404;
            response.message = {
            "message" : "Review ID not found " + reviewId
          };
        }
      }
    if (response.status !== 200) {
        res
          .status(response.status)
          .json(response.message);
    } else {
        hotel.reviews.id(reviewId).remove();
        hotel.save(function(err, hotelUpdated) {
            if (err) {
                res
                .status(500)
                .json(err);
            } else {
                res
                .status(204)
                .json();
            }
        });
      }
    });

};



