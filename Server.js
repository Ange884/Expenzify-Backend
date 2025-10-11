//const express = require ("express");
import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();

const PORT = process.env.PORT ||  5001  ;  

app.get("/", (req,res) =>{
    res.send("it is working");
});
console.log("my port:", process.env.PORT);

app.listen(5001,() =>{
    console.log("server is up and running on PORT:5001")
})