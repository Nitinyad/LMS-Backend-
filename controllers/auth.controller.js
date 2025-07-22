const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/user.model')

exports.signup = async(req ,res)=>{
    const {username , email , password, role } = req.body;

    const hash = await bcrypt.hash(password , 10)
    const user = await User.create({username , email , password : hash, role})
    res.status(201).json(user)
}

exports.login = async(req, res)=>{
    const {email , password} = req.body;

    const user = await User.findOne({email})

    if(!user || !await bcrypt.compare(password , user.password)){
        return res.status(401).json({message : "invalid credentials"})
    }

    const token = jwt.sign({userId : user._id , role : user.role} , process.env.JWT_SECRET || 'secret', { expiresIn: '1h' })
    res.json({token})
}

