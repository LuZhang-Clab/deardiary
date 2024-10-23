process.env.API-KEY
process.env.LOWDB-URL

//let express = require('express');

import express from 'express'
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';

let app = express();

// connect to the db
const defaultData = { dearDiaryData: [] };
const adapter = new JSONFile('db.json');
const db = new Low(adapter, defaultData);

import bodyParser from 'body-parser';
app.use(bodyParser.json());

let dearDiary = [];

let port = process.env.PORT || 5000;
app.listen(port, () => {
console.log('listening at ', port);
});



// app.get ('/',(req,res)=>{
//     res.send ('this is the main page');
// })

//2. add a route on server, that is listening for a post request.

app.post('/diary', (req, res) => {
    console.log(req.body);
    let currentDate = Date();
    let obj = {
        date: currentDate,
        thing: req.body.thediary
    }
    // dearDiary.push(obj);
    // console.log(dearDiary);

    // add value to the db
    db.data.dearDiaryData.push(obj);
    db.write()
        .then(() => {
            res.json({ task: "success" });
        })

})

app.use('/', express.static('public'));

// app.listen(5000, () => {
//     console.log('listen at localhost:5000');

// })

//add route to get all diary info 
app.get('/getDiary', (req, res) => {
    // let obj = { data: dearDiary };

    // fetch from the db
    db.read()
        .then(() => {
            let obj = { data: db.data.dearDiaryData }
            res.json(obj);

        })
})