//const express = require ("express");
import express from "express";
import dotenv from "dotenv";
import { sql } from "./config/db.js";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT ||  5001  ;
async function initDB(){
    try{
        await sql`CREATE TABLE IF NOT EXISTS transactions(
        id SERIAL PRIMARY KEY,
        user_id VARCHAR (255) NOT NULL,
        title VARCHAR(255) NOT NULL,
        amount DECIMAL(10,2) NOT NULL,
        category VARCHAR(255) NOT NULL,
        created_at DATE NOT NULL DEFAULT CURRENT_DATE
        )`
        console.log("Database initialized successfully");
    }catch (error){
          console.log("Error initializing DB", error)
          process.exit(1);
    }
}

app.post("/api/transactions", async (req, res) => {
  try {
    const { title, amount, category, user_id } = req.body;

    if (!title || amount === undefined || !category || !user_id) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const transactions = await sql`
      INSERT INTO transactions (user_id, title, amount, category)
      VALUES (${user_id}, ${title}, ${amount}, ${category})
      RETURNING *
    `;

    console.log(transactions);
    res.status(201).json(transactions[0]);
  } catch (error) {
    console.error("Error creating the transactions", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


initDB().then(() =>{
    app.listen(5001,() =>{
    console.log("server is up and running on PORT:5001")
  });
});