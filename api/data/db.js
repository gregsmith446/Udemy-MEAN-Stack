//after installing it, require mongoose
var mongoose = require('mongoose');
// assign the URL of the database to dburl
var dburl = 'mongodb://gregsmith446-firstworkspace-5563387/meanhotel';
// connect to the db using the url of the port in c9
mongoose.connect(dburl);

//*3 event listeners - connected, disconnected, error
mongoose.connection.on('connected', function() {
    console.log('Mongoose Connected to ' + dburl);
});

mongoose.connection.on('disconnected', function() {
    console.log('Mongoose disconnected');
});

//takes an error object on the callback's parameter to tell us what the error is
mongoose.connection.on('error', function(err) {
    console.log('Mongoose connection error: ' + err);
});

//*3 process listeners - SIGINIT, SIGTERM, SIUSR2
//listens for the SIGNIT event process to fire, the one sent after CNTRL+C has been entered
process.on('SIGINT', function() {
  mongoose.connection.close(function() {  //once it hears SIGINIT, it closes the mongodb connection
      console.log('Mongoose disconnected through app termination (SIGINIT)'); //sends this message
      process.exit(0); //and then tells the mongo process it can now exit
  }); 
});

process.on('SIGTERM', function() {
    mongoose.connection.close(function() {
        console.log('Mongoose disconnected through app termination (SIGTERM)');
        process.exit(0);
    }) ;
});

process.once('SIGUSR2', function() {
    mongoose.connection.close(function() {
        console.log('Mongoose disconnected through app termination (SIGUSR2)');
        process.kill(process.pid, 'SIGUSR2');
    });
});


//bringing in the schemas and models
require('./hotels.model.js');
require('./users.model');
