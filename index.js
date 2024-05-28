const express=require('express');

const {Router}=require('./src/routes')
 
const app=express();

app.use(express.json());

app.use((request,response,next)=>{

    response.setHeader('Access-Control-Allow-Origin', '*')

   response.setHeader("Access-Control-Allow-Credentials", "true");

   response.setHeader("Access-Control-Allow-Headers", "content-type");

   response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT");

    next()
})

app.use('/movies',Router);

app.listen(8000,()=>{
    console.log("Welcome to node");
})

