 const fs = require('fs');
 const superagent = require('superagent');

 fs.readFile(`${__dirname}/dog-api/dog.txt`, (error,data) => {

    // superagent.get() method actually returns a promise.
    // we can use it by then()
    //  console.log(`Breed : ${data}`);
    //  superagent.get(`https://dog.ceo/api/breed/${data}/images/random`).end((error,result) =>  {
    //     if(error) return console.log(error.message);
    //     console.log(result.body);
    //     console.log(result.body.message);

    //     fs.writeFile('dog-image.txt', result.body.message, (error,result) => {
    //         console.log('Random dog image save to file!');
    //     });

    //  });

    // FROM CALLBACK HELL TO PROMISES
    console.log(`Breed : ${data}`);
    superagent.get(`https://dog.ceo/api/breed/${data}/images/random`).then(response => {
            console.log(response.body);
            console.log(response.body.message);
            fs.writeFile('dog-image.txt', response.body.message, (error) => {
                console.log('Random dog image save to file!');
            });
        } 
    ).catch(err => {
        console.log(err.message);
    });
 });