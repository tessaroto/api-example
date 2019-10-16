var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/example";

var app = express();
app.use(bodyParser());



// respond with "hello world" when a GET request is made to the homepage
app.get('/:collection/:id', function(req, res) {


	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
	  	var dbo = db.db("example");
	  	console.log("get " +req.params.collection+ " " + req.params.id)

	  	dbo.collection(req.params.collection).findOne({_id: parseInt(req.params.id)}, function(err, result) {
	    	if (err) throw err;

	    	if (result){
		  		result["id"] = result["_id"]
		  		delete result["_id"]
		  	}
	    	res.json(result);
	    	db.close();
	  	});
	  // 	dbo.collection(req.params.collection).find({id: req.params.id}).toArray(function(err, result) {
			// console.log(err)	  		
	  // 		console.log(result)

	  //   if (err) throw err;
	  //   res.json(result);
	  //   //console.log(result.name);
	  //   db.close();
	  // });
	});
});

app.post('/:collection', function(req, res) {

	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
	  	var dbo = db.db("example");
	  	var obj = req.body;
	  	if (obj){
	  		obj["_id"] = obj["id"]
	  		delete obj["id"]
	  	}
	  	
	  	//console.log(obj)

	  	dbo.collection(req.params.collection).insertOne(obj, function(err, result) {
	    if (err) throw err;
	    res.json(result);
	    //console.log(result.name);
	    db.close();
	  });
	});
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
