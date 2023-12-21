require('dotenv').config()

const express = require('express')
const cors = require('cors') // Include the cors middleware
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const path = require('path')
// const corsOptions = require('./config/cors') // Remove this line
// const connectDB = require('./config/database')
const errorHandlerMiddleware = require('./middleware/error_handler')
const authenticationMiddleware = require('./middleware/authentication')

const app = express()
const PORT = 3500

// Connect to MongoDB
mongoose.set("strictQuery", false)
mongoose.connect('mongodb+srv://mohameddaoud99:yNDLAWlTL9vtNNag@cluster0.jaaqxok.mongodb.net/?retryWrites=true&w=majority')
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(3000, () => {
      console.log(`Node API app is running on port 3000`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

// Allow Credentials - Remove this line
// app.use(credentials)

// CORS
app.use(cors());

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
  } else {
    res.type('text').send('404 Not Found')
  }
});
