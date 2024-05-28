const { request } = require('express');
const {Pool} = require('pg');

//Config to connect the Database 
let db = new Pool({
   host: 'localhost',
   user: 'postgres',
   password: '123456',
   database: 'Movies',
   port: 5432
 });

// to get a single movie 
const getSingleMovie =async(req,res)=>{
   try 
   {
      let result =  await db.query(`SELECT * from Movies where movietime=100`);
      if(result.rows.length > 0)
      {
        res.send(result.rows);
      }
      else{
        res.send("Error in Connecting ");
      }
   }
   catch(err)
   {
    res.status(500).send("Error in getSingleMovie function");
   }  
}

//to get all movies 
const getMovies =async(req,res)=>{
   try{
    let result =  await db.query(`SELECT * from Movies`);
    if(result.rows.length > 0)
      {
       res.send(result.rows);
      }
    else{
       res.send("Error in Connecting ");
      } 
   }
   catch(err)
      {
      res.status(500).send("Error in getMovies function");
      } 
}
//to insert the new movie 
const postMovies =async(req,res)=>{

    try
    {
      let body=req.body
      let result =  await db.query(`Insert into Movies (MovieID,MovieTitle,MovieYear,MovieTime,MovieLanguage,MovieReleaseDate,MovieReleaseCountry) 
      values(${body.MovieID},'${body.MovieTitle}',${body.MovieYear},${body.MovieTime},'${body.MovieLanguage}','${body.MovieReleaseDate}','${body.MovieReleaseCountry}')`);
   
      if(result.rowCount!=0)
      {
       res.send('Inserted Sucessfully ');
      }
      else{
       res.send("Error in Connecting ");
      }
   }
   catch(err)
   {
      res.status(500).send("Error in postMovies function");
   }
    
}
//to update the exists values 
const updateMovies =async(req,res)=>{
   try 
   {
    let body=req.body
    
    let result =  await db.query(`  update Movies set MovieTitle = '${body.MovieTitle}',MovieYear = ${body.MovieYear},MovieTime = ${body.MovieTime},MovieLanguage = '${body.MovieLanguage}',MovieReleaseDate = '${body.MovieReleaseDate}',MovieReleaseCountry = '${body.MovieReleaseCountry}'
    where MovieID=${body.MovieID} `);

    if(result.rowCount!=0)
    {
       console.log(result);
       res.send('Updated  Sucessfully ');
    }
    else{
       res.send("Error in Connecting ");
      }
   }
   catch(err)
   {
      res.status(500).send("Error in updateMovies function");
   }
    
}

//partially delete the existing record with condition
const deleteMovies = async(req,res)=>{
   try{
    let body=req.body;

    let result=await db.query(`update Movies set is_active=0 where MovieId=${body.MovieID}`)
   
    if(result.rowCount!=0)
    {
       res.send('Deleted Sucessfully ');
    }
    else{
       res.send("Error in Connecting ");
    }
   }

   catch(err)
   {
      res.status(500).send("Error in deleteMovies function");
   }

}

module.exports={getMovies,getSingleMovie,postMovies,updateMovies,deleteMovies}