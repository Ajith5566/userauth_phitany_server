//import express
const express=require('express');

//import usercontroller

const userController=require('../Controller/userController')


//create object for routing
const router=express.Router();

//set path

//path for register request
router.post('/user/register',userController.register)


//export router
module.exports=router;