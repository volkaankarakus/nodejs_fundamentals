const http = require('http');
const url = require('url');
const fs = require('fs'); 

// SERVER
// Let's give priority to /api and run it synchronously. (TOP LEVEL CODE)
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`,'utf-8');
const dataObj = JSON.parse(data);


const server = http.createServer((req,res) => {
    console.log(req.url);
    const pathName = req.url;
    if(pathName === '/' || pathName === '/overview'){
        res.end('This is overview');
    }
    else if(pathName ==='/product'){
        res.end('This is product');
    }
    else if (pathName === '/api' ){
        // The code below is efficient. Let's send a request once, read it, and then take action from there.
        // fs.readFile(`${__dirname}/dev-data/data.json`,'utf-8',(error,data) => {
        //     const productData  = JSON.parse(data);
        //     res.writeHead(200,{
        //         'Content-type' : 'application/json'});
        //     res.end(data);
        // });
        res.writeHead(200,{'Content-type' : 'application/json'});
        res.end(data);
    } 
    else{
        res.writeHead(404,{ 
            
            //header must be decleared before res.end()
            'Content-type' : 'text/html',
            'my-own-header' : 'hello-world' 
        });
        res.end('Page not found!');
    }
});

server.listen(8000,'127.0.0.1', () => {
    console.log('Listening to requests on port 8000');
});