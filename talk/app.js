//require files
require('./instantHello');
var goodbye = require('./talk/goodbye');
var talk = require('./talk'); //don't need to specify index.js './talk' will find it
var question = require('./talk/question');

//call methods from the files required above
talk.intro();
talk.hello("Greg");

//
var answer = question.ask("What is the meaning of life?");
console.log(answer);

goodbye();