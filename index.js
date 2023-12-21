require('dotenv').config()

const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const path = require('path')
//const corsOptions = require('./config/cors')
//const connectDB = require('./config/database')
const credentials = require('./middleware/credentials')
const errorHandlerMiddleware = require('./middleware/error_handler')
const authenticationMiddleware = require('./middleware/authentication')

const app = express()
const PORT = 3500

//connectDB()

// Allow Credentials
app.use(credentials)

// CORS
app.use(cors(
  {
    origin:["http://127.0.0.1:5173"],
    methods :["GET","OPTIONS","PATCH","DELETE","POST","PUT"],
    credentials:true
  }
))

// application.x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))


// application/json response
app.use(express.json())

// middleware for cookies
app.use(cookieParser())

app.use(authenticationMiddleware)

// static files
app.use('/static', express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  res.send('Hello NODE API')
})


// Default error handler
app.use(errorHandlerMiddleware)


// Routes
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/products', require('./routes/api/product'))

app.all('*', (req, res) => {
  res.status(404)

  if(req.accepts('json')){
    res.json({'error': '404 Not Found'})
  }else{
    res.type('text').send('404 Not Found')
  }
})

app= async (req, res) => {
  // Your API logic here

  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5173');
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

  // Your response
  res.status(200).json({ message: 'Success' });
};

mongoose.set("strictQuery", false)
mongoose.
connect('mongodb+srv://mohameddaoud99:yNDLAWlTL9vtNNag@cluster0.jaaqxok.mongodb.net/?retryWrites=true&w=majority')
.then(() => {
    console.log('connected to MongoDB')
    app.listen(3000, ()=> {
        console.log(`Node API app is running on port 3000`)
    });
}).catch((error) => {
    console.log(error)
})

module.exports = app;