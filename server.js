require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { createUser } = require('./controllers/authControllers');
const {  getDatas, addData, updateData } = require('./controllers/dataControllers');
const cors=require('cors');


const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());


const allowedOrigins = ['https://api-task-frontend-gray.vercel.app'];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));


mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB Atlas');
}).on('error', (error) => {
  console.log('MongoDB connection error:', error);
});



  
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


app.get('/api/data/:userId',getDatas)
app.post('/api/create',createUser)
app.post('/api/add',addData)
app.put('/api/update/:id',updateData)
  

