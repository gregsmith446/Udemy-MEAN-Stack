var express = require('express');
var router = express.Router();

var ctrlHotels = require('../controllers/hotels.controller.js')
var ctrlReviews = require('../controllers/reviews.controllers.js')


//hotel routes
router
    .route('/hotels')
    .get(ctrlHotels.hotelsGetAll)
    .post(ctrlHotels.hotelsAddOne);

router
    .route('/hotels/:hotelId')
    .get(ctrlHotels.hotelsGetOne)
    .put(ctrlHotels.hotelsUpdateOne)
    .delete(ctrlHotels.hotelsDeleteOne);


//review routes

//works
router
    .route('/hotels/:hotelId/reviews')
    .get(ctrlReviews.reviewsGetAll)
    .post(ctrlHotels.reviewsAddOne);

//throws an ECONNreset - unhandled error request
router
    .route('/hotels/:hotelId/reviews/:reviewId')
    .get(ctrlReviews.reviewsGetOne)
    .put(ctrlReviews.reviewsUpdateOne)
    .delete(ctrlHotels.reviewsDeleteOne);


module.exports = router;