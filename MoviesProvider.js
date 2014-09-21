var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
var BSON = require('mongodb').BSON;
var ObjectID = require('mongodb').ObjectID;

MoviesProvider = function(host, port) {
  this.db= new Db('nodemovies', new Server(host, port, {auto_reconnect: true}, {}));
  this.db.open(function(){});
};



MoviesProvider.prototype.getCollection= function(callback) {
  this.db.collection('movies', function(error, movies_collection) {
    console.log(error);
	if( error ) callback(error);
    else callback(null, movies_collection);
  });
};


MoviesProvider.prototype.save=function(movies, callback) {
this.getCollection(function(error,movies_collection){
console.log(movies);
if(error){
callback(error);
}else{
movies_collection.insert(movies, function() {
          callback(null, movies);
        });
}

})
};


MoviesProvider.prototype.findById = function(id, callback) {
    this.getCollection(function(error, movie_collection) {
      if( error ) callback(error)
      else {
        movie_collection.findOne({_id: movie_collection.db.bson_serializer.ObjectID.createFromHexString(id)}, function(error, result) {
          if( error ) callback(error)
          else callback(null, result)
        });
      }
    });
};

MoviesProvider.prototype.findAll = function(callback) {
    this.getCollection(function(error, movie_collection) {
      
	  if( error ) callback(error)
      else {
        movie_collection.find().toArray(function(error, results) {
          console.log("Ww "+results.length);
		  if( error ) callback(error)
          else callback(null, results)
        });
      }
    });
};


exports.MoviesProvider = MoviesProvider;