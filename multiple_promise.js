// Lets suppose that we actually wanted to get three random dog images and not just one.

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
        //   Lets suppose that we actually wanted to get three random dog images and not just one.
        //   we could do something like this.

        // const response1 = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
        // const response2 = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
        // const response3 = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);

        //   Why would we actually make the second API call wait for the first one, and the third one wait for the second one?
        //   That would just add unnecessary waiting time. We should run these promises at the same time as below:
        const response1Promise =  superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
        const response2Promise =  superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
        const response3Promise =  superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
        const allPromises = await Promise.all([response1Promise,response2Promise,response3Promise]);
        const images = allPromises.map(element => element.body.message);
        console.log(allPromises);

        
        // we dont need to use for loop here. we solve it with join()
        await writeFilePromise('dog-image.txt',images.join('\n'));
        console.log('Random dog image saved to file!');   
    }catch(err){
        console.log(err);
        throw err;
    }
    return 'The string in this return does not work when the function is called. because async functions return Promise. then() must be added after calling the function to return the return here.';
}


// A better version of this code is as follows.
( async () => {
    try{
        const x = await getDogPicture();
        console.log(x);
    }catch(error){
        console.log('ERROR 💥');
    }
})();