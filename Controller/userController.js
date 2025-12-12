const users = require('../Modal/userSchema');  // ✅ IMPORTANT
//import jwt
const jwt = require('jsonwebtoken');


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
    console.log('inside login function');
    
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