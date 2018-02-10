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
const { Client } = require('pg');
var express = require('express'); 
var app = express();
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

/*
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
*/

app.get('/getHit', function (req, res){
	const client = new Client({
  	connectionString: process.env.DATABASE_URL,
  	ssl: true,
	});

	client.connect();

	client.query('SELECT name, time_commit FROM mentors WHERE language = "French";', (err, res) => {
  		if (err) throw err;
  		for (let row of res.rows) {
    res.send(JSON.stringify(row));
  	}
  	client.end();
	});
});

app.post('/postStudent', function (req, res){
	var name = req.name;
	var language = req.language;
	var time_commit = req.time_commit;
	var skill = req.skill;

	const client = new Client({
  	connectionString: process.env.DATABASE_URL,
  	ssl: true,
	});

	client.connect();

	client.query('insert into mentors (name, language, time_commit, skill) values ('+ name +', '+language+', '+time_commit+', '+skill+');', (err, res) => {
  		if (err) throw err;
  		for (let row of res.rows) {
    res.send(JSON.stringify(row));
  	}
  	client.end();
	});
});

app.post('/postMentor', function (req, res){
	console.log("started postMentor");
	var name = req.name;
	var language = req.language;
	var time_commit = req.time_commit;
	var skill = req.skill;
	console.log(req);
	const client = new Client({
  	connectionString: process.env.DATABASE_URL,
  	ssl: true,
	});

	client.connect();

	client.query('insert into mentors (name, language, time_commit, skill) values ('+ name +', '+language+', '+time_commit+', '+skill+');', (err, res) => {
  		if (err) throw err;
  		for (let row of res.rows) {
    res.send(JSON.stringify(row));
  	}
  	client.end();
	});
});



app.listen(process.env.PORT || 3000);

