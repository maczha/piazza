const express = require('express')
const app = express()

const mongoose = require('mongoose')
const bodyParser = require('body-parser')
require('dotenv/config')

app.use(bodyParser.json())

// api routes for users and posts defined
const usersRoute = require('./routes/user')
const authRoute = require('./routes/auth')
const postRoute = require('./routes/post')



app.use('/api/user', authRoute)
app.use('/api/user', usersRoute)
app.use('/api/posts', postRoute)




const MURL = process.env.DB_CONNECTOR
mongoose.connect(MURL)


app.listen(3000, ()=>{
    console.log("Server is running")
})