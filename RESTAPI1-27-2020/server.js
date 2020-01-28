const express = require('express');
const app = express();
const mongoose = require('mongoose');

require('dotenv/config');


app.get('/', (req, res) => {
    console.log(process.env.DB_ID);
    
    res.json({message: "hello"});
});

const myMongoDBId = process.env.DB_ID;


mongoose.connect(myMongoDBId, { useNewUrlParser: true, useUnifiedTopology: true });

const mongoDBConnection = mongoose.connection;

mongoDBConnection.on('error', (error) => console.error(error));
mongoDBConnection.once('open', () => console.log('Connected to Database'));

app.listen(3000, () => console.log('Server listening\nMDB ID: ', process.env.DB_ID));