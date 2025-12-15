// -----------------------------
// IMPORTS
// -----------------------------

// Import Express to create router
const express = require("express");

// Import controller functions (user + todo logic)
const userController = require("../Controller/userController");

// Import JWT middleware for protecting routes
const jwtMiddleware = require("../middleware/jwtmiddleware");

// -----------------------------
// ROUTER INITIALIZATION
// -----------------------------

// Create an Express Router instance
const router = express.Router();

// -----------------------------
// USER AUTH ROUTES (PUBLIC)
// -----------------------------

// Register a new user
// Endpoint: POST /user/register
router.post("/user/register", userController.register);

// Login existing user
// Endpoint: POST /user/login
router.post("/user/login", userController.login);

// -----------------------------
// TODO ROUTES (PROTECTED)
// -----------------------------
// These routes require a valid JWT token
// JWT middleware verifies token and attaches userId to req object

// Add a new todo for the logged-in user
// Endpoint: POST /todo/add
router.post("/todo/add", jwtMiddleware, userController.addTodo);

// Get all todos of the logged-in user
// Endpoint: GET /todo/all
router.get("/todo/all", jwtMiddleware, userController.getTodos);

// Update a specific todo (status / task)
// Endpoint: PUT /todo/update/:id
router.put("/todo/update/:id", jwtMiddleware, userController.updateTodo);

// Delete a specific todo
// Endpoint: DELETE /todo/delete/:id
router.delete("/todo/delete/:id", jwtMiddleware, userController.deleteTodo);

// -----------------------------
// EXPORT ROUTER
// -----------------------------

// Export router to be used in server.js / app.js
module.exports = router;
