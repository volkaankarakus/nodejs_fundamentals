// starting file where everything starts and its there when we listen to our server.
const app = require('./app');

// START SERVER
const port  = 3000;
app.listen(port, () => {
    console.log(`App listen ing on port ${port}`);
}); 