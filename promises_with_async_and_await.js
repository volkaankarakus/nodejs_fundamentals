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
    }
}

getDogPicture();


  