const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const authRouter = require('./routes/auth-routes.js');

//config dotenv
dotenv.config();

//rest object
const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

// parse JSON bodies
app.use(express.json());

// parse cookies
app.use(cookieParser());

//rest api
app.get('/', (req, res) => {
    res.send("<h1>Hello from Express server</h1>");
});

app.use('/api/auth', authRouter);

//port
const PORT = process.env.PORT || 3000;
//run server
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});