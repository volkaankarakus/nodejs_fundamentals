const superagent = require('superagent');
const fs = require('fs');


// READ FILE PROMISE
const readFilePromise =  file => {
    return new Promise((resolve, reject) => {
       fs.readFile(file, (err, data) => {
           if(err) reject('I could not find that file');
           resolve(data);
       })
    })    
}

// WRITE FILE PROMISE
const writeFilePromise = (file,data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(file,data, error => {
            if(error) reject('Could not write file!');
            resolve('Successfully!');
        })
    });
}

// async function will automatically return a promise.
const getDogPicture = async () => {
    try{
        const data =  await readFilePromise(`${__dirname}/dog-api/dog.txt`);
        console.log(`Breed : ${data}`);
        const response = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
        console.log(response.body.message);
        await writeFilePromise('dog-image.txt',response.body.message);
        console.log('Random dog image saved to file!');   
    }catch(err){
        console.log(err);
        throw err;
    }
    return 'The string in this return does not work when the function is called. because async functions return Promise. then() must be added after calling the function to return the return here.';
}

// A catch(err) check must be performed after then().
//  Because even if the function gives an error later, 
//   it does not fall into the catch() within the try catch().
//   and throw should be added to catch() in try catch()
// getDogPicture()
//     .then(description => {
//         console.log(description);
//     })
//     .catch(error => {
//         console.log('ERROR 💥');    
//     });


// A better version of this code is as follows.
( async () => {
    try{
        const x = await getDogPicture();
        console.log(x);
    }catch(error){
        console.log('ERROR 💥');
    }
})();
  