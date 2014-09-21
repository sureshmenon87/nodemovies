var express = require('express');
var router = express.Router();
var MoviesProvider=require('../MoviesProvider').MoviesProvider;
var moviesProvider = new MoviesProvider('localhost', 27017);


router.get('/addmovies', function(req, res) {
  res.render('addmovies', { title: 'Node Movies' });
});


router.post('/save', function(req, res) {
console.log("Called save");
moviesProvider.save({
        title: req.param('title'),
         desc: req.param('desc'),
		 director: req.param('director'),
		 stars: req.param('stars'),
	 
    },function(err,movies){
	console.log(err);
	res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
	});
	
});
router.get('/', function(req, res){
    
	moviesProvider.findAll( function(error,docs){
        console.log("?"+docs.length);
		res.render('index.jade', {title: 'Movies',movies:docs});
            
        });
    })



router.get('/:id', function(req, res) {
console.log(req.params.id);
    moviesProvider.findById(req.params.id, function(error,movie) {
        res.render('moviedetails.jade',{
            title: movie.title,
            movie:movie
        }
        );
    });
});
	
	
module.exports = router;
