//require mongoose
var mongoose = require('mongoose');

//schema for rooms only, but 'linked to' in hotelSchema
var reviewSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    rating : {
        type : Number,
        min : 0,
        max : 5,
        required : true
    },    
    review : {
        type : String,
        required : true
    },
    createdOn : {
        type : Date,
        "default" : Date.now
    }
});

//schema for rooms only, but 'linked to' below in hotelSchema
var roomSchema = new mongoose.Schema({
    type : String,
    number : Number,
    description : String,
    photos : [String],
    price : Number
});


// it uses a method on the mongoose var from above.
// we will use the JS 'new' variable to create the schema as a JS object
var hotelSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    stars : {
        type : Number,
        min : 0,
        max : 5,
        "default" : 0
    },    
    services : [String],
    description : String,
    photos : [String],
    currency : String,
    review : [reviewSchema],
    rooms : [roomSchema],
    location : {
        address : String,
        coordinates : [Number]
    }
});

mongoose.model('Hotel', hotelSchema, 'hotel');