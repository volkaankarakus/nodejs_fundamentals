const fs = require('fs');
const slugify = require('slugify');
const http = require('http');
const url = require('url');

// Slugify creates slugs.
//   slug is basically just the last part of the URL's that contains a unique string that identifies the resource 
//   that the website is displaying.

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`,'utf-8');
const dataObj = JSON.parse(data);

const slugs = dataObj.map(element => slugify(element.productName,{lower : true}));
console.log(slugs);


const server = http.createServer((req,res) => {
    const baseUrl = `http://${req.headers.host}`;
    const reqUrl = new URL(req.url,baseUrl);
    console.log(reqUrl);
    const queries= {};
    for( const [key,value] of reqUrl.searchParams.entries()){
        queries[key] = value;
    }
    const pathName = reqUrl.pathname;

    if(pathName === '/' || pathName === '/overview'){
        res.end('This is overview');
    }
    else if(pathName ==='/product'){
        console.log(`pathname : ${pathName}`); // for http://127.0.0.1:8000/product?id=1 -> pathname : /product
        const queryID = reqUrl.searchParams.get("id"); // -> Query ID : 1
        console.log(`Query ID : ${queryID}`);
       
        res.writeHead(200,{'Content-type' : 'application/json'});
        res.end('This is product');
    }
    else if (pathName === '/api' ){
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