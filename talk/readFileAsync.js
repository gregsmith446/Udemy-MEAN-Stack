var fs = require('fs');

var onFileLoad = function(err, file) {
    console.log("Got the file");
};

console.log("Going to get a file");

fs.readFile('readFileSync.js', onFileLoad);

// commented out the anonymous callback for one with a var 
// fs.readFile('readFileSync.js', function(err, file) {
//   console.log("Got the file"); 
// });

console.log("App continues...");