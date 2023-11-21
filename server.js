const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

// starting file where everything starts and its there when we listen to our server.
const app = require('./app');

// which environment we currently in?
console.log(app.get('env')); // -> 'development'
// to set it from start -> NODE_ENV=development nodemon server.js
// to see config.env -> npm install dotenv

// START SERVER
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App listen ing on port ${port}`);
});
//npm install eslint prettier eslint-config-prettier eslint-plugin-prettier eslint-config-airbnb eslint-plugin-node eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react --save-dev