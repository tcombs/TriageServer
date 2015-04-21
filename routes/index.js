var express = require('express');
var router = express.Router();
var pg = require('pg');
var conString = "postgres://tyler:tyler@localhost/tyler";

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});

router.get('/area', function(req, res, next) {
	res.send('This is a route for area');
});

router.get('/path', function(req, res, next) {
	console.log(req.body.pid)
	var pid = req.query.pid;
	var t1 = req.query.t1;
	var t2 = req.query.t2;
	if(t1 > t2)
	{
		var tmp = t1;
		t1 = t2;
		t2 = tmp;
	}
	console.log(pid = ' ' + t1 + ' ' + t2 );
	
	
	var resultSet = [];

	pg.connect(conString, function(err, client, done) {
		// Handle Errors
		if(err) {
			console.log(err);
		}
		else{
			var q = "SELECT * FROM log l WHERE l.pid=$1 AND l.time > $2 and l.time < $3 ORDER BY l.time";
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
