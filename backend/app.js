const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./api/routes/authRoutes');
const cors = require('cors');
const cookieParser = require('cookie-parser');
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const dbName = process.env.MONGO_DBNAME || 'techarc';

app.set('view engine', 'ejs'); 

const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}${dbName}`;
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

