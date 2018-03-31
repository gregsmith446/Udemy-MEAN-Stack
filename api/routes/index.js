var express = require('express');
var router = express.Router();

var ctrlHotels = require('../controllers/hotels.controllers.js');
var ctrlReviews = require('../controllers/reviews.controllers.js');
var ctrlUsers = require('../controllers/users.controllers.js');

//hotel routes

//all the hotel data
router
    .route('/hotels')
    .get(ctrlUsers.authenticate, ctrlHotels.hotelsGetAll)
    .post(ctrlHotels.hotelsAddOne);
    

//one hotel by ID
router
    .route('/hotels/:hotelId')
    .get(ctrlHotels.hotelsGetOne)
    .put(ctrlHotels.hotelsUpdateOne)
    .delete(ctrlHotels.hotelsDeleteOne);


//reviews routes

//route to reviews for given hotelID
router
    .route('/hotels/:hotelId/reviews')
    .get(ctrlReviews.reviewsGetAll)
    .post(ctrlUsers.authenticate, ctrlReviews.reviewsAddOne);

//route for reviews for a hotel by ID
router
    .route('/hotels/:hotelId/reviews/:reviewId')
    .get(ctrlReviews.reviewsGetOne)
    .put(ctrlReviews.reviewsUpdateOne)
    .delete(ctrlReviews.reviewsDeleteOne);
    
// user register + login routers
router
    .route('/users/register')
    .post(ctrlUsers.register);

router
    .route('/users/login')
    .post(ctrlUsers.login);

module.exports = router;