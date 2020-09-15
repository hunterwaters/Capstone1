const express = require('express');
const dotenv = require('dotenv');
const app = express();
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const path = require('path');
app.use(cookieParser());
app.use(express.json());

dotenv.config({ path: './.env' });

const  PORT = process.env.PORT || 4000;

mongoose.connect('mongodb+srv://hunterwaters:Goldsgym1@capstone.swmh2.mongodb.net/Capstone?retryWrites=true&w=majority',{useNewUrlParser: true, useUnifiedTopology: true}, () =>{  
    console.log('successfully connected to database');
});

const userRouter = require('./routes/User');
app.use('/user', userRouter);

//if(process.env.NODE_ENV === 'production') {
    //app.use(express.static('client/build'))

    //app.get('*', (req, res) => {
        //res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.hmtl'));
    //});
//}



app.listen(PORT, () => {
    console.log('express server started');
});