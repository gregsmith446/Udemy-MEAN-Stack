var child_process = require('child_process');

console.log(1);

var newProcess = child_process.spawn('node', ['_fibonacci.js'], {
    stdio : 'inherit' //gets the console.log files to show in main process
});

console.log(2);