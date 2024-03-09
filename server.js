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
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
  credentials: true,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB Atlas');
}).on('error', (error) => {
  console.log('MongoDB connection error:', error);
});




  
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


app.get('/api/data/:userId',cors(corsOptions),getDatas)
app.post('/api/create',cors(corsOptions),createUser)
app.post('/api/add',cors(corsOptions),addData)
app.put('/api/update/:id',cors(corsOptions),updateData)
  

