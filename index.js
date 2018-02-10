/*
var express = require('express');
var app = express();
var path = require('path');

app.use(express.static(path.join(__dirname)));
//app.use("/styles", express.static(__dirname));
//app.use("/images", express.static(__dirname + '/images'));
//app.use("/scripts", express.static(__dirname + '/scripts'));

// viewed at based directory http://localhost:8080/
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + 'views/index.html'));
});

// add other routes below
//app.get('/about', function (req, res) {
//  res.sendFile(path.join(__dirname + 'views/about.html'));
//});

app.listen(process.env.PORT || 8080);
*/

var express = require('express'); 
var app = express();
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

var pg = require('pg');

app.get('/db', function (request, response) {
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query('SELECT * FROM test_table', function(err, result) {
      done();
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
       { response.render('pages/db', {results: result.rows} ); }
    });
  });
});


app.listen(process.env.PORT || 3000);

