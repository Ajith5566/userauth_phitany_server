//import express
const express=require('express');

//import usercontroller

const userController=require('../Controller/userController')


//create object for routing
const router=express.Router();

//set path

//path for register request
router.post('/user/register',userController.register)

//path to resolve login
router.post('/user/login',userController.login)


//export router
module.exports=router;