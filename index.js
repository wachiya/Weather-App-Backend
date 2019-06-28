const express = require('express')
const path = require('path');
const app = express()
const port = 3002


//Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

// Add headers
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

//mysql database
var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  port : 3306,
  user: 'root',
  password: 'password',
  database: 'weatherapp'
})

connection.connect()

//set static folder __middlewre
// app.use(express.static(path.join(__dirname, 'public')))

//endpoints

app.get('/moods', (req, res) => {
  connection.query('SELECT * from moods', 
  (error, results, fields) => {
    if (error) {
      console.log('---err---', error);
    }
    res.send(results);
  });
})

app.post('/moods', (req, res) => {
  console.log('New here', req.body);
  try {
    connection.query('INSERT INTO moods SET ?', req.body, 
    (error, results, fields) => {
      console.log('error---', error);
      if (results){
         let mood = req.body;
      mood.id = results.insertId;
      console.log('results', results);
      res.json(mood);
      }  else{
        res.json([]);
      }
     
    })
  } catch (err) {
    res.send(err)
  }
});

app.put('/moods/:id', (req, res) => {
let id = req.params.id;
const query = connection.query(`UPDATE moods SET mood_type = '${req.body.mood_type}' WHERE id= ${id}`, (error, results, fields) => {
  if(error) 
    res.json({succes: false, error: error});
  res.json({succes: true, mood: req.body});
  })
  // console.log(query.sql);
})

app.delete('/moods/:id', (req, res) => {
  console.log('delete delete delete', req.params);
  let id = req.params.id;
  connection.query(`DELETE FROM moods WHERE id=${id}`, 
  (error, results) => {
    if(error){
      console.log('---err---', error);
    }
    res.send('User deleted!');
  });
})


//activities table
app.get('/activities', (req, res) => {
  connection.query('SELECT * from activities', 
  (error, results, fields) => {
    if (error) {
      console.log('---err---', error);
    }
    res.json(results);
  });
})


app.post('/activities', (req, res) => {
  console.log('New  activity here', req.body);
  try {
    connection.query('INSERT INTO activities SET ?', req.body, 
    (error, results, fields) => {
      console.log('error---', error);
      if (results){
        let activity = req.body;
     activity.id = results.insertId;
     console.log('results', results);
     res.json(activity);
     }  else{
       res.json([]);
     }
    
   })
 } catch (err) {
   res.send(err)
 }
});


app.put('/activities/:id', (req, res) => {
  let id = req.params.id;
  const query = connection.query(`UPDATE activities SET activity_type = '${req.body.activity_type}' WHERE id= ${id}`, (error, results, fields) => {
    if (error)
      res.json({succes: false, error: error});
    res.json({succes: true, activity: req.body});
    })
    // console.log(query.sql);
  })

app.delete('/activities/:id', (req, res) => {
  console.log('delete delete delete', req.params);
  let id = req.params.id;
  connection.query(`DELETE FROM activities WHERE id=${id}`, 
  (error, results) => {
    if(error){
      console.log('---err---', error);
    }
    res.send('User deleted!');
  });
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
