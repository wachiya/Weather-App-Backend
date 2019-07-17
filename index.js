const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3002;

//Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

let SqlConnection = require('./Models/sql-connection');
let activityRepo = require('./Repositories/activity-repository');
let moodRepo = require('./Repositories/mood-repository');

sqlConnection = new SqlConnection();

sqlConnection.create((err, dbase) => {
  if (err) {
    console.log('err', err);
    return;
  }

  console.log('connection---', dbase);

  let activityData = new activityRepo(dbase);
  let moodData = new moodRepo(dbase);

  //console.log('moodData', moodData);
  //moods endpoints
  app.get('/moods', (req, res) => {
    moodData.getAll((error, results) => {
      if (error) {
        console.log('Oops! Something went wrong!', error);
      }
      res.json(results);
    });
  })

  app.post('/moods', (req, response) => {
      moodData.insertOne(req)
        .then((res) => {
          console.log("new res", res);
          response.json(res);
        })
      // moodData.insertOne(req, (error, results) => {
      //   if (error) {
      //     console.log('Oops! Something went wrong!', error);
      //   }
      //  res.json(results);
      //  res.end('Inserted success');
      //});
  })
  
  app.put('/moods/:id', (req, res) => {
    //console.log('moods results!', results);
    moodData.updateOne(req, (error, results) => {
      if (error) {
        console.log('Oops! Something went wrong!', error);
      }
      res.json(results);
    });
  })

  app.delete('/moods/:id', (req, res) => {
    moodData.deleteOne(req, (error, results) => {
      if (error) {
        console.log('Oops! Something went wrong!', error);
      }
      res.json(results);
    })
  })

  //activities endpoints
  app.get('/activities', (req, res) => {
    activityData.getAll((error, results) => {
      if (error) {
        console.log('Oops! Something went wrong!', error);
      }
      res.json(results);
    });
  })

  app.post('/activities', (req, res) => {
    activityData.insertOne(req, (error, results) => {
      if (error) {
        console.log('Oops! Something went wrong!', error);
      }
     res.json(results);
     res.end('Inserted success');
    });
  })
  
  app.put('/activities/:id', (req, res) => {
    //console.log('moods results!', results);
    activityData.updateOne(req, (error, results) => {
      if (error) {
        console.log('Oops! Something went wrong!', error);
      }
      res.json(results);
    });
  })

  app.delete('/activities/:id', (req, res) => {
    activityData.deleteOne(req, (error, results) => {
      if (error) {
        console.log('Oops! Something went wrong!', error);
      }
      res.json(results);
    })
  });

 //start the express server

 app.listen(port, () => console.log(`Example app listening on port ${port}!`))
});
