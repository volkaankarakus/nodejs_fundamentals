const fs = require('fs');
const superagent = require('superagent');


// READ FILE PROMISE
const readFilePromise =  file => {
     return new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            if(err) reject('I could not find that file');
            resolve(data);
        })
     })    
}


// readFilePromise(`${__dirname}/dog-api/dog.txt`).then(data => {
//     console.log(`Breed : ${data}`);
//     superagent.get(`https://dog.ceo/api/breed/${data}/images/random`).then(response => {
//             console.log(response.body);
//             console.log(response.body.message);
//             fs.writeFile('dog-image.txt', response.body.message, (error) => {
//                 console.log('Random dog image save to file!');
//             });
//         } 
//     ).catch(err => {
//         console.log(err.message);
//     });
// });

// Make it Promise with return
readFilePromise(`${__dirname}/dog-api/dog.txt`)
    .then(data => {
        console.log(`Breed : ${data}`);
        return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)})
    .then(response => {
        console.log(response.body);
        console.log(response.body.message);
        return fs.writeFilePromise('dog-image.txt',response.body.message)
    .then(() =>  {
        console.log('Random dog image save to file!');
    })
    })
    .catch(err => {
        console.log(err.message);
    });

  
// WRITE FILE PROMISE
const writeFilePromise = (file,data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(file,data, error => {
            if(error) reject('Could not write file!');
            resolve('Successfully!');
        })
    });
}