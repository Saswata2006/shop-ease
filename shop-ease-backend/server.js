const express = require('express');
const dotenv = require('dotenv');
const authRouter = require('./routes/auth-routes.js');

//config dotenv
dotenv.config();


//rest object
const app = express();

// parse JSON bodies
app.use(express.json());

//rest api
app.get('/', (req, res) => {
    res.send("<h1>Hello from Express server</h1>");
});

app.use('/auth',authRouter);

//port
const PORT = process.env.PORT || 3000;
//run server
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});