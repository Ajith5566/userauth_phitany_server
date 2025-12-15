const users = require('../Modal/userSchema');  // ✅ IMPORTANT
//import jwt
const jwt = require('jsonwebtoken');
const Todo = require("../Modal/todoModel");


// logic for register
exports.register = async (req, res) => {
    console.log(req.body);

    const { name, mobile, email, password, confirmPassword } = req.body;

    try {
        // check if user exists
        const existingUser = await users.findOne({ mailId: email });

        if (existingUser) {
            return res.status(406).json({ message: "User already exists" });
        }

        // create new user
        const newUser = new users({
            username: name,
            phoneNumber: mobile,
            mailId: email,
            password: password,
            confirmPassword: confirmPassword   // 🔥 FIXED HERE
        });

        // save user in DB
        await newUser.save();

        return res.status(200).json(newUser);

    } catch (err) {
        return res.status(401).json({
            message: "Registration process failed",
            error: err.message
        });
    }
};


//logic for login
exports.login=async(req,res)=>{
    //console.log('inside login function');
    
    const {email,password} =req.body;

   try{const existingUser = await users.findOne({mailId: email, password: password});
   if(existingUser){

    //token generation-sign('data','secretkey')
   const token=  jwt.sign({userId:existingUser._id},"superSecretkey123")

    res.status(200).json({existingUser,token})
   }else{
    res.status(406).json("Incorrect email or password")
   }
 }catch(err){
    res.status(401).json('Login request failed due to ',err)
 }
}



// ADD TODO
exports.addTodo = async (req, res) => {
  try {
    const { task } = req.body;

    if (!task) {
      return res.status(400).json("Task required");
    }

    const newTodo = new Todo({
      task,
      userId: req.userId, // from JWT
    });

    await newTodo.save();
    res.status(200).json(newTodo);
  } catch (err) {
    res.status(500).json("Error adding todo");
  }
};

// GET TODOS (user specific)
exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.userId }).sort({
      createdAt: -1,
    });

    res.status(200).json(todos);
  } catch (err) {
    res.status(500).json("Error fetching todos");
  }
};

// UPDATE TODO
exports.updateTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await Todo.findOneAndUpdate(
      { _id: id, userId: req.userId },
      req.body,
      { new: true }
    );

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json("Error updating todo");
  }
};

// DELETE TODO
exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    await Todo.findOneAndDelete({
      _id: id,
      userId: req.userId,
    });

    res.status(200).json("Todo deleted");
  } catch (err) {
    res.status(500).json("Error deleting todo");
  }
};
