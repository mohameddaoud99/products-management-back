require('dotenv').config();

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const path = require('path');
const credentials = require('./middleware/credentials');
const errorHandlerMiddleware = require('./middleware/error_handler');
const authenticationMiddleware = require('./middleware/authentication');

const app = express();
const PORT = 3500;

// Allow Credentials
app.use(credentials);

// CORS
app.use(cors({
  origin: ["https://pm-frontend-dkm.pages.dev"],
  methods: ["GET", "OPTIONS", "PATCH", "DELETE", "POST", "PUT"],
  credentials: true,
}));

// application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// application/json response
app.use(express.json());

// middleware for cookies
app.use(cookieParser());

app.use(authenticationMiddleware);

// static files
app.use('/static', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.send('Hello NODE API');
});

// Default error handler
app.use(errorHandlerMiddleware);

// Routes
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/products', require('./routes/api/product'));

app.all('*', (req, res) => {
  res.status(404);

  if (req.accepts('json')) {
    res.json({ error: '404 Not Found' });
  } else {
    res.type('text').send('404 Not Found');
  }
});

// Your API logic here
app.get('/your-api-endpoint', (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', 'https://pm-frontend-dkm.pages.dev');
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

  // Your response
  res.status(200).json({ message: 'Success' });
});

mongoose.set("strictQuery", false);
mongoose
  .connect('mongodb+srv://mohameddaoud99:yNDLAWlTL9vtNNag@cluster0.jaaqxok.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Node API app is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(error);
  });

module.exports = app;
