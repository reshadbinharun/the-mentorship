/* The Mentorship */

/*
Copyright 2018 <Md Reshad Bin Harun, Naoki Okada, Hriktik Bhansali, David Massart>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/

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
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended : true}));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

	DATABASE_URL = 'postgres://xmjmejyqovmyxr:f83166d3ca07aa04da2b3b1e1b92cf7fd8a769a54d6ac89d2171ff5cdd5113fd@ec2-54-225-199-107.compute-1.amazonaws.com:5432/d9gfqjbk55m9bs?ssl=true';
	const client = new Client({
  	connectionString: DATABASE_URL,
  	ssl: true,
	});
	client.connect();

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

app.post('/getHit', function (req, res){
	var language = req.body.language;
	var time_commit = req.body.time_commit;
	var skill = req.body.skill;
	//client.connect();

	//var query_string = 'SELECT name, time_commit, skill, language FROM mentors WHERE language = \''+language+', skill = \''+skill+';';
	var query_string = 'SELECT * FROM mentors WHERE language = \''+language+'\' and skill = \''+skill+'\' and time_commit >= \''+time_commit+'\';';
	console.log(query_string);
	client.query(query_string, (err, res2) => {
  		if (err) throw err;
  		for (let row of res2.rows) {
    res.send(JSON.stringify(row));
    console.log(JSON.stringify(row));
  	}
  	//client.end();
	});
});

app.post('/postStudent', function (req, res){
	var name = req.name;
	var language = req.language;
	var time_commit = req.time_commit;
	var skill = req.skill;

	
	client.query('insert into mentors (name, language, time_commit, skill) values ('+ name +', '+language+', '+time_commit+', '+skill+');', (err, res) => {
  		if (err) throw err;
  		for (let row of res.rows) {
    res.send(JSON.stringify(row));
  	}
  	//client.end();
	});
});

app.post('/postMentor', function (req, res){
	console.log("started postMentor");
	var name = req.body.name;
	var language = req.body.language;
	var time_commit = req.body.time_commit;
	var skill = req.body.skill;
	console.log(name);
	

	
	//client.connect();
	var query_string = 'insert into mentors (name, language, time_commit, skill) values (\''+ name +'\', \''+language+'\', \''+time_commit+'\', \''+skill+'\');';
	console.log(query_string);
	client.query(query_string, (err, res2) => {
  		if (err) throw err;
  		res.redirect('/index.html');
  		res.end();
  	//client.end();
	
});
	console.log(process.env.DATABASE_URL);
});



app.listen(process.env.PORT || 3000);

