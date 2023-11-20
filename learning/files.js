// fs means File System
// With this module, we will get accessto functions for reading and writing data right to the file system.
const fs = require('fs');
const { text } = require('stream/consumers');

// ** This is the BLOCKING, synchronous way. 
const textInput = fs.readFileSync('./txt/input.txt','utf-8');
console.log(textInput);
const textOutput = `This is what we know about the avocado : ${textInput}\nCreated on ${Date.now()}`;
fs.writeFileSync('./txt/output.txt',textOutput);
console.log('File written!');

// ** This is the NON-BLOCKING, asynchronous way.
fs.readFile('./txt/start.txt','utf-8', (error,data) => {
    console.log(data);
});
console.log('Will read file!');

