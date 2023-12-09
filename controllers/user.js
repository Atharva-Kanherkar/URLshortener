const { v4: uuidv4 } = require('uuid');

 const {setUser, getUser} = require('../service/auth');
 const User = require('../models/user');
 async function handleUserSignup(req, res) {
    const { name, email, password } = req.body;

    try {
         
        if (!name || !email || !password) {
          
            return res.status(400).send("Missing required fields");
        }

         
        const newUser = await User.create({
            name,
            email,
            password,
        });

        return res.render("home");
    } catch (err) {
        // Handle any other errors that might occur during user creation
        return res.status(500).send("Error creating user");
    }
}

async function handleUserLogin(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });

    if (!user) {
         
        return res.render("login", {
            error: "Invalid username or password!"
        });
    }
    const sessionId = uuidv4();
    setUser(sessionId, user);
    res.cookie('uid', sessionId);
    return res.render("home");
}



module.exports  = {handleUserSignup, handleUserLogin};