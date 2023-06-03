const bcrypt = require('bcrypt');
const User = require('../models/user')
const jwt = require('jsonwebtoken')

function generateAccessToken(id,name,phonenumber){
    return jwt.sign({userId: id, name: name, phonenumber:phonenumber}, 'secretkey');
}

exports.getAllUsers = async (req,res) =>{
    const user = await User.findAll();
    res.json(user)
}

exports.signupUser = async (req, res) => {
    const { name, email, password, phonenumber } = req.body;
    if (name === undefined || name.length === 0 || password == null || password.length === 0 || email == null || email.length === 0 || phonenumber === 0 || phonenumber=== null) {
      return res.status(400).json({ err: "BAD PARAMETERS . SOMETHING IS MISSING" })
    }
    try {
      const saltRounds = 10
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        await User.create({ name, email, password,phonenumber: hash });
        res.status(201).json({ message: "SUCCESSFULLY CREATE NEW USER" })
      })
  
    } catch (err) {
      if (err.name === 'SequelizeUniqueConstraintError') {
        res.status(400).json({ error: 'Email already exists' });
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  };