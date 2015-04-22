var express = require('express');
var router = express.Router();
var pg = require('pg');
var geoStrin = "postgres://tyler:tyler@localhost/geolife";
var simString = "postgres://tyler:tyler@localhost/tyler";

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});

router.get('/region', function(req, res, next) {
	var x1 = req.query.x1;
	var x2 = req.query.x2;
	var y1 = req.query.y1;
	var y2 = req.query.y2;
	var time = req.query.time;
	var sim = (req.query.sim == 'true');
	console.log(typeof sim);
	var resultSet = [];
	var conString;
	if(sim){
		conString = simString;
	}
	else {
		conString = geoStrin;
	}
	pg.connect(conString, function(err, client, done) {
		// Handle Errors
		if(err) {
			console.log(err);
		}
		else{
			var q = "select * from log l where l.x >= $1 and l.x <= $2 and l.y >= $3 and l.y <= $4 and l.time = $5";
	        var query = client.query(q,[x1,x2,y1,y2,time]);
	        //console.log(query);
	        // Stream results back one row at a time
	        query.on('row', function(row) {
	        	resultSet.push(row);
	        	console.log(row);
	        });
	        // After all data is returned, close connection and return results
	        query.on('end', function() {
	        	client.end();
	        	//console.log(resultSet);
	        	return res.json(resultSet);
	        });
    	}
	});

});

router.get('/path', function(req, res, next) {
	var pid = req.query.pid;
	var t1 = req.query.t1;
	var t2 = req.query.t2;
	var sim = (req.query.sim == 'true');
	var conString;
	if(sim){
		conString = simString;
	}
	else {
		conString = geoStrin;
	}
	console.log(typeof sim);
	if(t1 > t2)
	{
		var tmp = t1;
		t1 = t2;
		t2 = tmp;
	}
	//console.log(pid = ' ' + t1 + ' ' + t2 );
	
	
	var resultSet = [];

	pg.connect(conString, function(err, client, done) {
		// Handle Errors
		if(err) {
			console.log(err);
		}
		else{
			var q = "SELECT * FROM log l WHERE l.pid=$1 AND l.time >= $2 and l.time <= $3 ORDER BY l.time";
	        var query = client.query(q,[req.query.pid,t1,t2]);
	        // Stream results back one row at a time
	        query.on('row', function(row) {
	        	resultSet.push(row);
	        	console.log(row);
	        });
	        // After all data is returned, close connection and return results
	        query.on('end', function() {
	        	client.end();
	        	return res.json(resultSet);
	        });
    	}
	});
});

module.exports = router;
