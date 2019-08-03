// server/app.js
// require dependencies

const express = require("express")
const routes = require('./routes/')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const cloudinary = require('cloudinary')

const app = express()
const router = express.Router()
const url = process.env.MONGODB_URI || "mongodb://localhost:27017/medium-clone"

//cloudinary conf

cloudinary.config({
    cloud_name:'alpozkanm',
    api_key:'252347397882481',
    api_secret:'S6d8JzPQBFPY-6ce4jevzzRKXKU'
})

//mongodb conn

try { 
    mongoose.connect(url, {
        //useMongoClient: true
    })
}catch(error){}

let port = 5000 || process.env.PORT

//api end point
routes(router)

//middlewares
app.use(cors())
app.use(bodyParser.json())
app.use(helmet())
//app.use('/static',express.static(path.join(__dirname,'static')))

app.use('/api',router)

app.listen(port, ()=> {
    console.log('server started at port : ${port}');
});