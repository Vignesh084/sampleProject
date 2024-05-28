const express=require('express');
const{postMovies,getMovies,deleteMovies,getSingleMovie, updateMovies}=require('./controller');

const Router=express.Router()


Router.get('/getsinglemovie',getSingleMovie)
Router.get('/getmovies',getMovies)
Router.post('/postmovies',postMovies)
Router.post('/updatemovies',updateMovies)
Router.post('/deletemovies',deleteMovies)

module.exports={Router};