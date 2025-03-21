const express = require('express')
const router = express.Router()
const User = require('../models/User')
const {registerValidation, loginValidation} = require('../validations/validation')
const bcryptjs = require('bcryptjs')
const jsonwebtoken = require('jsonwebtoken')

router.post('/register', async(req, res) => {
    try {
        // check if data is valid
        const {error} = registerValidation(req.body)
        if(error) {
            return res.status(400).send({"message": error.details[0].message})
        }

        // Check if user already exists
        const userExists = await User.findOne({email: req.body.email})
        if(userExists) {
            return res.status(400).send({message: "User already exists"})
        }
        
        // Hash password 
        const salt = await bcryptjs.genSalt(5)
        const hashedPassword = await bcryptjs.hash(req.body.password, salt)

        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })

        const savedUser = await user.save()
        return res.status(201).send(savedUser)
    } catch(err) {
        console.error('Registration error:', err)
        return res.status(500).send({message: "Server error during registration"})
    }
})

router.post('/login', async(req, res) => {
    try {
        // check if data is valid
        const {error} = loginValidation(req.body)
        if(error) {
            return res.status(400).send({message: error.details[0].message})
        }

        // Find user
        const user = await User.findOne({email: req.body.email})
        if(!user) {
            return res.status(400).send({message: "User does not exist"})
        }

        // decrypt password
        const passwordValid = await bcryptjs.compare(req.body.password, user.password)
        if(!passwordValid) {
            return res.status(400).send({message: 'Password is incorrect'})
        }

        
        const token = jsonwebtoken.sign({_id: user._id}, process.env.TOKEN_SECRET)
        
        nfo
        return res.status(200).header('auth-token', token).send({
            message: "Login successful", 
            userId: user._id,
            'auth-token': token
        })
    } catch(err) {
        console.error('Login error:', err)
        return res.status(500).send({message: "Server error during login"})
    }
})

module.exports = router