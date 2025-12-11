const users = require('../Modal/userSchema');  // ✅ IMPORTANT

// logic for register
exports.register = async (req, res) => {
    console.log(req.body);

    const { name, mobile, email, password, confirmPassword } = req.body;

    try {
        const existingUser = await users.findOne({ mailId: email });

        if (existingUser) {
            return res.status(406).json({ message: "User already exists" });
        }

        const newUser = new users({
            username: name,
            phoneNumber: mobile,
            mailId: email,
            password,
            confirmPassword
        });

        await newUser.save();

        return res.status(200).json(newUser);

    } catch (err) {
        return res.status(401).json({
            message: "Registration process failed",
            error: err.message
        });
    }
};


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
