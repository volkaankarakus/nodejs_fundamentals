// fs means File System
// With this module, we will get accessto functions for reading and writing data right to the file system.
const fs = require('fs');
const { text } = require('stream/consumers');

const textInput = fs.readFileSync('./txt/input.txt','utf-8');
console.log(textInput);

const textOutput = `This is what we know about the avocado : ${textInput}\nCreated on ${Date.now()}`;
fs.writeFileSync('./txt/output.txt',textOutput);
console.log('File written!');