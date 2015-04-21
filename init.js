var     lazy = require("lazy"),
fs = require("fs"),
pg = require('pg'),
xml2js = require('xml2js');

var conString = "postgres://tyler:tyler@localhost/tyler";

//this starts initializes a connection pool
//it will keep idle connections open for a (configurable) 30 seconds
//and set a limit of 20 (also configurable)





//region and timestep
//person every step from time 1 to time 2


//Trivial data storage    

var parser = new xml2js.Parser();



pg.connect(conString, function(err, client, done) {
  if(err) {
    return console.error('error fetching client from pool', err);
    }
 //(id,pid,time,x,y)



 var query = "INSERT INTO log VALUES (DEFAULT,$1,$2,$3,$4);"

 //console.log(query)

 new lazy(fs.createReadStream('initial_data/sim.xml'))
 .lines
 .forEach(function(line){
     var line = line.toString();

     parser.parseString(line, function (err, result) {
        if(err){
            console.log(err);
        }
        else {
            client.query(query, [result.log.$.id,result.log.$.simstep,result.log.$.x,result.log.$.y], function(err, result) {
                if(err) {
                  return console.error('error running query', err);
                }
            });
        }

    });
 });


 
});






// fs.readFile('initial_data/sim.xml', function(err, data) {
//     parser.parseString(data, function (err, result) {
//      if(err){
//          console.log(err);
//      }
//      else {
//          var logs = result.gpsLog.log;
//          //insert each log
//          logs.forEach(function(entry) {
//              insertRow(entry)
//          });
//          //console.log('Done');
//      }

//     });
// });
