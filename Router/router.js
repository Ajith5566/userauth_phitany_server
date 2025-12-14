//import express
const express=require('express');

//import usercontroller

const userController=require('../Controller/userController')
const jwtMiddleware = require("../middleware/jwtmiddleware");


//create object for routing
const router=express.Router();

//set path

//path for register request
router.post('/user/register',userController.register)

//path to resolve login
router.post('/user/login',userController.login)

router.post("/todo/add", jwtMiddleware, userController.addTodo);
router.get("/todo/all", jwtMiddleware, userController.getTodos);
router.put("/todo/update/:id", jwtMiddleware, userController.updateTodo);
router.delete("/todo/delete/:id", jwtMiddleware, userController.deleteTodo);


//export router
module.exports=router;