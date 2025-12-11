// 1) import dotenv module
require('dotenv').config();

// 2) import express
const express = require('express');

// 3) import cors
const cors = require('cors');

// import router
const router = require('./Router/router'); 

// import DB connection
require('./DB/connection');  // ensures DB connects before server starts

// 4) create server
const todoServer = express();

// 5) use cors
todoServer.use(cors());

// 6) convert json to JS object
todoServer.use(express.json());

// 7) use router
todoServer.use(router);

// 8) set port correctly
const PORT = process.env.PORT || 4000;

// 9) run server
todoServer.listen(PORT, () => {
  console.log(`Todo server running successfully on port ${PORT}`);
});
