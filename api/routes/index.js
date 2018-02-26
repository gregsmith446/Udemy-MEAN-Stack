var express = require('express');
var router = express.Router();

var ctrlHotels = require('../controllers/hotels.controller.js')

router
    .route('/hotels')
    .get(ctrlHotels.hotelsGetAll);

router
    .route('/hotels/:hotelId')
    .get(ctrlHotels.hotelsGetOne);

router
    .route('/hotels/new')
    .post(ctrlHotels.hotelsAddOne);

module.exports = router;

// test homepage
// app.get('/', function(req, res) {
//     console.log("GET the homepage");
//     res
//     .status(200)
//     .sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// test app.js file retrieval
// app.get('/file', function(req, res) {
//     console.log("GET the file");
//     res
//     .status(200)
//     .sendFile(path.join(__dirname, 'app.js'));
// });